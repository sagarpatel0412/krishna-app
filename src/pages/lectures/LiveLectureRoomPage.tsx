import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { getOnlineLecture } from "../../services/onlineLectureService";
import useAuth from "../../hooks/useAuth";

export default function LiveLectureRoomPage() {
    const { lectureId } = useParams();

    const { user } = useAuth();

    const [lecture, setLecture] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLecture() {
            try {
                if (!lectureId) return;

                const data = await getOnlineLecture(Number(lectureId));
                setLecture(data);
            } catch (err: any) {
                setError(err.message || "Failed to load lecture");
            } finally {
                setLoading(false);
            }
        }

        loadLecture();
    }, [lectureId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-orange-50">
                <div className="rounded-[2rem] bg-white p-8 text-orange-600 shadow-xl">
                    Loading lecture room...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-red-50 px-6">
                <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-xl">
                    <h1 className="text-3xl font-black text-red-600">
                        Access Denied
                    </h1>

                    <p className="mt-4 text-slate-600">{error}</p>

                    <Link
                        to="/lectures"
                        className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white"
                    >
                        Back to Lectures
                    </Link>
                </div>
            </main>
        );
    }

    const isCreator = lecture.created_by_user_id === user?.id;

    if (!lecture) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-950">
            <section className="border-b border-white/10 bg-slate-900 px-6 py-4 text-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
                            Krishna Wisdom Live
                        </p>

                        <h1 className="mt-1 text-2xl font-extrabold">
                            {lecture.title}
                        </h1>

                        <p className="mt-1 text-sm text-slate-300">
                            {lecture.iskcon_centre?.name} • Hosted by{" "}
                            {lecture.created_by?.name || "Verified Devotee"}
                        </p>
                    </div>

                    <Link
                        to="/lectures"
                        className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900"
                    >
                        Exit Room
                    </Link>
                </div>
            </section>
            <section>
                {isCreator ? (
                    <div className="bg-green-100 px-4 py-3 text-green-800">
                        You are the lecture host. Please click <b>Log-in</b> inside Jitsi to start the meeting as moderator.
                        <a
                            href={`https://meet.jit.si/${lecture.room_name}`}
                            target="_blank"
                            className="rounded-full bg-blue-600 px-5 py-2 text-white"
                        >
                            Open in Jitsi as Host
                        </a>
                    </div>
                    ) : (
                    <div className="bg-orange-100 px-4 py-3 text-orange-800">
                        Waiting for devotee host to start the lecture.
                    </div>
                )}
            </section>

            <section className="h-[calc(100vh-96px)]">
                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={lecture.room_name}

                    userInfo={{
                        displayName:
                            user?.name || "Krishna Wisdom User",

                        email:
                            user?.email || "",
                    }}

                    configOverwrite={{
                        startWithAudioMuted: true,
                        startWithVideoMuted: true,

                        disableDeepLinking: true,

                        prejoinPageEnabled: true,

                        enableLobbyChat: false,

                        enableWelcomePage: false,

                        lobby: {
                            autoKnock: false,
                        },

                        securityUi: {
                            hideLobbyButton: true,
                        },
                    }}

                    interfaceConfigOverwrite={{
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,

                        MOBILE_APP_PROMO: false,

                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                    }}

                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.height = "100%";
                        iframeRef.style.width = "100%";
                        iframeRef.style.border = "0";
                    }}
                />
                {/* <iframe
                    src={`https://meet.jit.si/${lecture.room_name}#config.prejoinPageEnabled=false&config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.enableWelcomePage=false`}
                    allow="camera; microphone; fullscreen; display-capture"
                    className="h-full w-full border-0"
                /> */}
            </section>
        </main>
    );
}