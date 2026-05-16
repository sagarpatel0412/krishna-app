// pages/chat/ChatRoomPage.tsx

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../services/socket";
import {
  getConversationMessages,
  sendMessage,
} from "../../services/chatService";
import useAuth from "../../hooks/useAuth";

type Message = {
  id: number;
  conversation_id: number;
  sender_user_id: number;
  message: string;
  createdAt: string;
  sender?: {
    id: number;
    name: string;
  };
};

export default function ChatRoomPage() {
  const { conversationId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [devoteeUser,setDevoteeUser] = useState<any>({})
  const [seekerUser,setSeekerUser] = useState<any>({})

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const {user, isUser,isDevotee} = useAuth()

  const otherUser = isDevotee ? seekerUser : devoteeUser;

  useEffect(() => {
    if (!conversationId) return;

    async function loadMessages() {
      try {
        const data = await getConversationMessages(Number(conversationId));
        setMessages(data.data);
        setDevoteeUser(data.devoteeDetails)
        setSeekerUser(data.seekerDetails)
      } catch (err: any) {
        setError(err.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    }

    loadMessages();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_conversation", Number(conversationId));

    socket.on("new_message", (newMessage: Message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === newMessage.id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    });

    socket.on("typing_start", (payload) => {
      if (payload?.user?.id !== user?.id) {
        setTypingUser(payload.user.name || "Someone");
      }
    });

    socket.on("typing_stop", (payload) => {
      if (payload?.user?.id !== user?.id) {
        setTypingUser("");
      }
    });

    return () => {
      socket.emit("leave_conversation", Number(conversationId));
      socket.off("new_message");
      socket.off("typing_start");
      socket.off("typing_stop");
    };
  }, [conversationId]);

  const backLink = isDevotee
    ? "/devotee/chats"
    : "/ask-guidance";

  const backLabel = isDevotee
    ? "← Back to devotee chats"
    : "← Back to guidance";

  const subtitle = isDevotee
    ? "You are replying to a seeker"
    : "Private conversation with verified devotee";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  function handleTyping(value: string) {
    setMessage(value);

    if (!conversationId) return;

    socket.emit("typing_start", {
      conversationId: Number(conversationId),
      user: {
        id: user?.id,
        name: user?.name,
      },
    });

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      socket.emit("typing_stop", {
        conversationId: Number(conversationId),
        user: {
          id: user?.id,
          name: user?.name,
        },
      });
    }, 900);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim() || !conversationId) return;

    const text = message.trim();
    setMessage("");

    socket.emit("typing_stop", {
      conversationId: Number(conversationId),
      user: {
        id: user?.id,
        name: user?.name,
      },
    });

    try {
      await sendMessage(Number(conversationId), text);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4 py-6">
      <section className="mx-auto flex h-[90vh] max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-orange-100 px-6 py-4">
          <div>
            <Link
              to={backLink}
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              {backLabel}
            </Link>

            <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
              {otherUser.name}
            </h1>

            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          </div>

          <div className="hidden rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700 md:block">
            Hare Krishna 🙏
          </div>
        </header>

        {error && (
          <div className="mx-6 mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto bg-orange-50/40 px-5 py-6">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="font-semibold text-orange-600">
                Loading messages...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="rounded-[2rem] bg-white p-8 shadow">
                <p className="text-4xl">🙏</p>
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  Start your first message
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                  Ask respectfully and clearly. The devotee will reply when
                  available.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isMine = msg.sender_user_id === user?.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] rounded-3xl px-5 py-3 shadow ${
                        isMine
                          ? "rounded-br-md bg-orange-600 text-white"
                          : "rounded-bl-md bg-white text-slate-800"
                      }`}
                    >
                      {!isMine && (
                        <p className="mb-1 text-xs font-bold text-orange-600">
                          {msg.sender?.name || "Devotee"}
                        </p>
                      )}

                      <p className="whitespace-pre-wrap leading-7">
                        {msg.message}
                      </p>

                      <p
                        className={`mt-2 text-right text-[11px] ${
                          isMine ? "text-orange-100" : "text-slate-400"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}

              {typingUser && (
                <div className="flex justify-start">
                  <div className="rounded-3xl rounded-bl-md bg-white px-5 py-3 text-sm font-semibold text-slate-500 shadow">
                    {typingUser} is typing...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-orange-100 bg-white px-5 py-4"
        >
          <div className="flex gap-3">
            <input
              value={message}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-orange-100 px-5 py-3 outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="rounded-full bg-orange-600 px-7 py-3 font-bold text-white shadow hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}