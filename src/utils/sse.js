import { BASE_URL } from "./constants";

let eventSource = null;

export function initOnlineStatusStream(onFriendOnline, onFriendOffline, onInitialFriends) {
 

  if (eventSource) {
    eventSource.close();
  }

  eventSource = new EventSource(`${BASE_URL}/user/online-status`, {
    withCredentials: true,
  });

  eventSource.addEventListener("connected", () => {
    console.log("✅ Connected to SSE stream");
  });

  eventSource.addEventListener("initial-online-friends", (e) => {
    const data = JSON.parse(e.data);
    onInitialFriends(data);
  });

  eventSource.addEventListener("friend-online", (e) => {
    const { userId } = JSON.parse(e.data);
    onFriendOnline(userId);
  });

  eventSource.addEventListener("friend-offline", (e) => {
    const { userId } = JSON.parse(e.data);
    onFriendOffline(userId);
  });

  eventSource.onerror = (err) => {
    console.error("❌ SSE error", err);
    closeOnlineStatusStream();
  };
}

export function closeOnlineStatusStream() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}
