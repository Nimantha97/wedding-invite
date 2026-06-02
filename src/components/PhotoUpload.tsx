import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadToCloudinary } from "../lib/api";

type FileStatus = "pending" | "uploading" | "done" | "error";

interface FileItem {
  id:       string;
  file:     File;
  preview:  string;
  status:   FileStatus;
  progress: number;
  url?:     string;
  error?:   string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "video/mp4", "video/quicktime"];
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

function uid() { return Math.random().toString(36).slice(2, 9); }

function formatBytes(b: number) {
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export default function PhotoUpload() {
  const [items, setItems]       = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateItem = (id: string, patch: Partial<FileItem>) =>
    setItems(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));

  const addFiles = useCallback((files: File[]) => {
    const valid = files.filter(f => {
      if (!ACCEPTED.includes(f.type)) return false;
      if (f.size > MAX_SIZE) return false;
      return true;
    });
    const newItems: FileItem[] = valid.map(file => ({
      id:       uid(),
      file,
      preview:  file.type.startsWith("image") ? URL.createObjectURL(file) : "",
      status:   "pending",
      progress: 0,
    }));
    setItems(prev => [...prev, ...newItems]);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [addFiles]);

  const removeItem = (id: string) => {
    setItems(prev => {
      const item = prev.find(f => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const uploadAll = async () => {
    const pending = items.filter(f => f.status === "pending");
    if (pending.length === 0) return;

    for (const item of pending) {
      updateItem(item.id, { status: "uploading", progress: 0 });
      try {
        const result = await uploadToCloudinary(item.file, (pct) =>
          updateItem(item.id, { progress: pct })
        );
        updateItem(item.id, { status: "done", progress: 100, url: result.secure_url });
      } catch (err) {
        updateItem(item.id, { status: "error", error: (err as Error).message });
      }
    }
  };

  const pendingCount  = items.filter(f => f.status === "pending").length;
  const doneCount     = items.filter(f => f.status === "done").length;
  const uploadingNow  = items.some(f => f.status === "uploading");

  return (
    <div className="wd-section" style={{ background: "var(--wd-bg-alt)" }}>
      <div className="wd-inner">
        <motion.p className="wd-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Share your memories
        </motion.p>
        <motion.h2 className="wd-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Photo Upload Center
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text-muted)", textAlign: "center", marginBottom: "2.5rem", lineHeight: 1.7 }}
        >
          Captured a beautiful moment? Upload your photos and videos from the wedding day.<br />
          We'd love to see the day through your eyes. 📸
        </motion.p>

        {/* Uploader name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: "400px", margin: "0 auto 2rem" }}
        >
          <label style={{ display: "block", fontFamily: "var(--wd-sans)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--wd-accent)", marginBottom: "0.45rem" }}>
            Your Name (optional)
          </label>
          <input
            className="wd-input"
            value={uploaderName}
            onChange={e => setUploaderName(e.target.value)}
            placeholder="So we know who to thank!"
          />
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          onDrop={onDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "var(--wd-gold)" : "var(--wd-border)"}`,
            borderRadius: "1.25rem",
            padding: "3rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "rgba(212,180,131,0.06)" : "var(--wd-bg-card)",
            transition: "all 0.25s ease",
            marginBottom: "1.5rem",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED.join(",")}
            style={{ display: "none" }}
            onChange={e => addFiles(Array.from(e.target.files ?? []))}
          />
          <motion.div
            animate={{ scale: dragging ? 1.08 : 1 }}
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            {dragging ? "✨" : "📁"}
          </motion.div>
          <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.3rem", fontWeight: 300, color: "var(--wd-text)", marginBottom: "0.5rem" }}>
            {dragging ? "Drop to add files" : "Drag & drop photos or videos here"}
          </p>
          <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.78rem", color: "var(--wd-text-muted)" }}>
            or click to browse · JPG, PNG, WEBP, HEIC, MP4 · Max 50 MB each
          </p>
        </motion.div>

        {/* File list */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginBottom: "1.5rem" }}
            >
              {/* Summary bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.78rem", color: "var(--wd-text-muted)" }}>
                  {items.length} file{items.length !== 1 ? "s" : ""} selected
                  {doneCount > 0 && ` · ${doneCount} uploaded`}
                </p>
                <button
                  onClick={() => setItems([])}
                  style={{ fontFamily: "var(--wd-sans)", fontSize: "0.7rem", color: "var(--wd-text-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Clear all
                </button>
              </div>

              {/* File cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.875rem" }}>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 180 }}
                    style={{
                      background: "var(--wd-bg-card)",
                      border: `1px solid ${item.status === "done" ? "rgba(144,195,167,0.5)" : item.status === "error" ? "rgba(224,89,89,0.4)" : "var(--wd-border)"}`,
                      borderRadius: "1rem",
                      overflow: "hidden",
                      boxShadow: "var(--wd-shadow)",
                      position: "relative",
                    }}
                  >
                    {/* Preview */}
                    <div style={{ height: "110px", background: "var(--wd-bg)", position: "relative", overflow: "hidden" }}>
                      {item.preview ? (
                        <img src={item.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                          🎬
                        </div>
                      )}

                      {/* Status overlay */}
                      {item.status === "done" && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(144,195,167,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
                          ✅
                        </div>
                      )}
                      {item.status === "error" && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(224,89,89,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
                          ❌
                        </div>
                      )}

                      {/* Remove button */}
                      {item.status !== "uploading" && (
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{
                            position: "absolute", top: "0.4rem", right: "0.4rem",
                            width: "1.5rem", height: "1.5rem",
                            borderRadius: "50%", border: "none",
                            background: "rgba(46,58,54,0.7)", color: "#fff",
                            fontSize: "0.7rem", cursor: "pointer", lineHeight: 1,
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Info + progress */}
                    <div style={{ padding: "0.6rem 0.75rem" }}>
                      <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.7rem", color: "var(--wd-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.3rem" }}>
                        {item.file.name}
                      </p>
                      <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.62rem", color: "var(--wd-text-muted)" }}>
                        {formatBytes(item.file.size)}
                      </p>

                      {/* Progress bar */}
                      {item.status === "uploading" && (
                        <div style={{ marginTop: "0.5rem", height: 3, background: "var(--wd-border)", borderRadius: 2, overflow: "hidden" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            style={{ height: "100%", background: "var(--wd-gold)", borderRadius: 2 }}
                          />
                        </div>
                      )}
                      {item.status === "uploading" && (
                        <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", color: "var(--wd-gold-dark)", marginTop: "0.25rem" }}>
                          {item.progress}%
                        </p>
                      )}
                      {item.status === "error" && (
                        <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.6rem", color: "#e05959", marginTop: "0.25rem" }}>
                          Failed — try again
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload button */}
        <AnimatePresence>
          {pendingCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
              style={{ textAlign: "center" }}
            >
              <button
                className="wd-btn wd-btn-solid"
                onClick={uploadAll}
                disabled={uploadingNow}
                style={{ opacity: uploadingNow ? 0.65 : 1, cursor: uploadingNow ? "not-allowed" : "pointer" }}
              >
                <span>
                  {uploadingNow
                    ? "Uploading…"
                    : `Upload ${pendingCount} file${pendingCount !== 1 ? "s" : ""} 📤`}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All done state */}
        <AnimatePresence>
          {doneCount > 0 && pendingCount === 0 && !uploadingNow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "1.5rem" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
              <p style={{ fontFamily: "var(--wd-serif)", fontSize: "1.5rem", fontWeight: 300, color: "var(--wd-text)", marginBottom: "0.5rem" }}>
                Thank you{uploaderName ? `, ${uploaderName}` : ""}!
              </p>
              <p style={{ fontFamily: "var(--wd-sans)", fontSize: "0.875rem", color: "var(--wd-text-muted)" }}>
                {doneCount} photo{doneCount !== 1 ? "s" : ""} uploaded successfully. We treasure every memory!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
