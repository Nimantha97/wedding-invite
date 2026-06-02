const BASE          = import.meta.env.VITE_APPS_SCRIPT_URL as string;
const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

// ── GET ─────────────────────────────────────────────
export async function fetchGuests() {
  const res = await fetch(`${BASE}?action=guests`);
  return res.json();
}

export async function fetchGuestbook() {
  const res = await fetch(`${BASE}?action=guestbook`);
  return res.json();
}

// ── POST ────────────────────────────────────────────
async function post(body: object) {
  const res = await fetch(BASE, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  return res.json();
}

export const submitRSVP = (data: {
  name: string; phone: string; email: string;
  guests: string; attending: string; meal: string; notes: string;
}) => post({ action: "rsvp", ...data });

export const submitGuestbook = (data: {
  name: string; relation: string; message: string;
}) => post({ action: "guestbook", ...data });

// ── Cloudinary upload ───────────────────────────────
export interface UploadResult {
  public_id: string;
  secure_url: string;
  original_filename: string;
  bytes: number;
  format: string;
}

export async function uploadToCloudinary(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);
    fd.append("folder", "wedding-2026");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(new Error(`Upload failed: ${xhr.statusText}`));
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(fd);
  });
}
