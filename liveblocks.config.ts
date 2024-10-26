// Import required modules from Liveblocks
import { LiveMap, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Configure the Liveblocks client
const client = createClient({
  throttle: 16,
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!,
});

// Define the types for Presence, Storage, UserMeta, RoomEvent, and ThreadMetadata

// Presence represents the properties that exist on every user in the Room
type Presence = {
  cursor: { x: number; y: number } | null; // Real-time cursor coordinates
};

// Storage represents the shared document that persists in the Room
type Storage = {
  canvasObjects: LiveMap<string, any>;
};

// UserMeta represents static metadata on each user, such as user ID and info
type UserMeta = {
  id: string;
  info: {
    name?: string;
    avatar?: string;
  };
};

// RoomEvent is for custom events. Union types are allowed for multiple events
type RoomEvent =
  | { type: "NOTIFICATION"; message: string }
  | { type: "REACTION"; emoji: string };

// ThreadMetadata represents metadata on each thread, used in comments and threads
type ThreadMetadata = {
  resolved: boolean;
  zIndex: number;
  time?: number;
  x: number;
  y: number;
};

// Create the Room Context with the defined types
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client, {
  async resolveUsers({ userIds }) {
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions, etc.
    return [];
  },
  async resolveMentionSuggestions({ text, roomId }) {
    // Used only for Comments. Return a list of userIds that match `text`
    return [];
  },
});