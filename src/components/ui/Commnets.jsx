"use client";
import { useState, useEffect, useMemo } from "react";
import { apiFetch } from "@/lib/api";
import { useUser } from "@/context/UserContext";

/******************************************************************
 * Helper utilities
 *****************************************************************/
const countAllDescendants = (node) => {
  if (!node.children) return 0;
  return node.children.reduce(
    (sum, child) => sum + 1 + countAllDescendants(child),
    0
  );
};

/******************************************************************
 * Recursive single‑comment component
 *****************************************************************/
function CommentNode({ node, addComment, upvoteComment }) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [open, setOpen] = useState(false); // toggle children

  /* counts used for preview labels */
  const directChildren = node.children?.length || 0;
  const totalDesc = useMemo(() => countAllDescendants(node), [node]);

  /* connector lines (minimalistic) */
  const Connector = () =>
    node.depth > 1 && (
      <span className="absolute -left-2 top-0 h-full border-l border-gray-300" />
    );

  return (
    <div className="relative w-full ">
      <Connector />
      <div className=" border p-3 rounded-md bg-white space-y-2  w-full">
        {/* header */}
        <div className="flex items-center gap-2">
          <img
            src={node.avatar}
            alt="avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
          <p className="text-xs font-semibold">{node.user_name}</p>
        </div>

        {/* body */}
        <p className="text-sm whitespace-pre-line pb-2">{node.content}</p>

        {/* actions */}
        <div className="flex gap-4 text-xs select-none border rounded-full px-2 py-1 bg-gray-100 ">
          {node.depth < 4 && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="hover:text-blue-500"
            >
              댓글쓰기
            </button>
          )}
          <button
            onClick={() => upvoteComment(node.id)}
            className="hover:text-blue-500"
          >
            추천&nbsp;({node.likes})
          </button>

          {/* toggle button */}
          {directChildren > 0 && (
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-blue-500"
            >
              {open ? "숨기기" : "댓글"}
              &nbsp;({node.depth === 1 ? totalDesc : directChildren})
            </button>
          )}
        </div>

        {/* reply box */}
        {showReply && node.depth < 4 && (
          <div className="mt-1 flex gap-2 text-sm">
            <input
              className="flex-1 border rounded-full px-3 py-1 "
              placeholder="멋진 답글"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="text-blue-600"
              onClick={() => {
                addComment(replyText, node.id, node.depth + 1);
                setReplyText("");
                setShowReply(false);
                setOpen(true);
              }}
            >
              완료
            </button>
          </div>
        )}

        {/* children */}
        {open && node.children?.length > 0 && (
          <div className="mt-2 space-y-2 pl-3">
            {node.children.map((child) => (
              <CommentNode
                key={child.id}
                node={child}
                addComment={addComment}
                upvoteComment={upvoteComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/******************************************************************
 * Container that fetches and manages the comment tree
 *****************************************************************/
export default function CommentTree({ postSlug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTopComment, setNewTopComment] = useState("");
  const { csrfToken } = useUser();

  /* fetch on mount / slug change */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/post/get_comments/?slug=${postSlug}`);
        const data = await res.json();
        setComments(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [postSlug]);

  /* optimistic helpers */
  const appendChild = (nodes, parentId, newNode) =>
    nodes.map((n) =>
      n.id === parentId
        ? { ...n, children: [newNode, ...(n.children || [])] }
        : { ...n, children: appendChild(n.children || [], parentId, newNode) }
    );

  const incrementLike = (nodes, id) =>
    nodes.map((n) =>
      n.id === id
        ? { ...n, likes: n.likes + 1 }
        : { ...n, children: incrementLike(n.children || [], id) }
    );
  const decrementLike = (nodes, id) =>
    nodes.map((n) =>
      n.id === id
        ? { ...n, likes: n.likes - 1 }
        : { ...n, children: incrementLike(n.children || [], id) }
    );
  /**************** add / like handlers ****************/
  const addComment = async (text, parentId = null, depth = 1) => {
    if (!text.trim()) return;

    const tempNode = {
      id: Date.now(),
      user_name: "me",
      avatar: "/avatar-placeholder.png",
      content: text,
      likes: 0,
      depth,
      children: [],
    };

    setComments((prev) =>
      parentId === null
        ? [tempNode, ...prev]
        : appendChild(prev, parentId, tempNode)
    );

    try {
      await apiFetch(`/api/post/write_comments/?slug=${postSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ content: text, parent_id: parentId }),
      });
    } catch (_) {
      /* roll-back or refetch on error if you like */
    }
  };

  const upvoteComment = async (id) => {
    try {
      const res = await apiFetch(`/api/post/like_comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("로그인 후 이용해주세요");
        return;
      }
      if (data.msg == "liked") {
        setComments((prev) => incrementLike(prev, id));
      } else if (data.msg == "unliked") {
        setComments((prev) => decrementLike(prev, id));
      }
    } catch (_) {}
  };

  /**************** render ****************/
  if (loading) return <p className="text-center py-4">댓글 불러오는 중…</p>;
  if (error) return <p className="text-center py-4 text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      {/* new top‑level comment */}
      <div className="flex w-full">
        <div className="relative flex w-full">
          <textarea
            className="block border rounded-lg px-4 py-2 resize-none h-24 w-full"
            placeholder="새 댓글을 입력하세요…"
            value={newTopComment}
            onChange={(e) => setNewTopComment(e.target.value)}
          ></textarea>{" "}
          <button
            className="absolute text-sm right-1 bottom-1 px-3 py-1 text-black rounded-full bg-gray-100 hover:bg-gray-300"
            onClick={() => {
              addComment(newTopComment);
              setNewTopComment("");
            }}
          >
            등록
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">첫 댓글을 남겨보세요!</p>
      ) : (
        comments.map((node) => (
          <CommentNode
            key={node.id}
            node={node}
            addComment={addComment}
            upvoteComment={upvoteComment}
          />
        ))
      )}
    </div>
  );
}
