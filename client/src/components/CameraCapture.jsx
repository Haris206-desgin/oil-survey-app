// import React, { useEffect, useRef, useState } from "react";
// import { X, Zap, ZapOff, RefreshCw, Camera as CameraIcon } from "lucide-react";

// export default function CameraCapture({ onCapture, onClose }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const streamRef = useRef(null);

//   const [facingMode, setFacingMode] = useState("environment");
//   const [torchOn, setTorchOn] = useState(false);
//   const [torchSupported, setTorchSupported] = useState(false);
//   const [error, setError] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function start() {
//       setReady(false);
//       setError(null);
//       stopStream();
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode, width: { ideal: 1280 }, height: { ideal: 1280 } },
//           audio: false,
//         });
//         if (cancelled) {
//           stream.getTracks().forEach((t) => t.stop());
//           return;
//         }
//         streamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play().catch(() => {});
//         }
//         const track = stream.getVideoTracks()[0];
//         const caps = track.getCapabilities ? track.getCapabilities() : {};
//         setTorchSupported(!!caps.torch);
//         setReady(true);
//       } catch (err) {
//         if (!cancelled) setError("Camera unavailable. You can upload a photo instead.");
//       }
//     }

//     start();
//     return () => {
//       cancelled = true;
//       stopStream();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [facingMode]);

//   function stopStream() {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }
//   }

//   async function toggleTorch() {
//     const track = streamRef.current?.getVideoTracks?.()[0];
//     if (!track || !torchSupported) return;
//     try {
//       await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
//       setTorchOn(!torchOn);
//     } catch {
//       // torch control not actually supported on this device; ignore
//     }
//   }

//   function flipCamera() {
//     setFacingMode((m) => (m === "environment" ? "user" : "environment"));
//   }

//   function takePhoto() {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas) return;
//     const w = video.videoWidth || 720;
//     const h = video.videoHeight || 1280;
//     canvas.width = w;
//     canvas.height = h;
//     const ctx = canvas.getContext("2d");
//     if (facingMode === "user") {
//       ctx.translate(w, 0);
//       ctx.scale(-1, 1);
//     }
//     ctx.drawImage(video, 0, 0, w, h);
//     const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
//     stopStream();
//     onCapture(dataUrl);
//   }

//   function handleFileFallback(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => onCapture(reader.result);
//     reader.readAsDataURL(file);
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       <div className="flex items-center justify-between px-4 pt-4 pb-3 relative z-10">
//         <button
//           onClick={toggleTorch}
//           disabled={!torchSupported}
//           className={`w-9 h-9 rounded-full flex items-center justify-center ${
//             torchSupported ? "bg-black/40 text-white" : "bg-black/20 text-white/30"
//           }`}
//           aria-label="Toggle flash"
//         >
//           {torchOn ? <Zap size={18} /> : <ZapOff size={18} />}
//         </button>
//         <button
//           onClick={flipCamera}
//           className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
//           aria-label="Flip camera"
//         >
//           <RefreshCw size={18} />
//         </button>
//         <button
//           onClick={() => {
//             stopStream();
//             onClose();
//           }}
//           className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
//           aria-label="Close camera"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       <div className="flex-1 relative overflow-hidden bg-gray-900">
//         <video
//           ref={videoRef}
//           playsInline
//           muted
//           className={`w-full h-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
//         />
//         {!ready && !error && (
//           <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
//             Starting camera…
//           </div>
//         )}
//         {error && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 text-sm px-8 text-center">
//             <CameraIcon size={32} className="text-white/40" />
//             <p>{error}</p>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="px-4 py-2 rounded-full bg-accent text-white text-sm font-medium"
//             >
//               Choose photo
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="py-6 flex items-center justify-center relative z-10 bg-black">
//         <button
//           onClick={takePhoto}
//           disabled={!ready}
//           aria-label="Capture photo"
//           className="w-16 h-16 rounded-full bg-white border-4 border-white/40 active:scale-95 transition disabled:opacity-40"
//         />
//       </div>

//       <canvas ref={canvasRef} className="hidden" />
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         capture="environment"
//         className="hidden"
//         onChange={handleFileFallback}
//       />
//     </div>
//   );
// }





// import React, { useEffect, useRef, useState } from "react";
// import { X, Zap, ZapOff, RefreshCw, Camera as CameraIcon, Image as ImageIcon } from "lucide-react";

// export default function CameraCapture({ onCapture, onClose }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const streamRef = useRef(null);

//   const [facingMode, setFacingMode] = useState("environment");
//   const [torchOn, setTorchOn] = useState(false);
//   const [torchSupported, setTorchSupported] = useState(false);
//   const [error, setError] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     let cancelled = false;

//     async function start() {
//       setReady(false);
//       setError(null);
//       stopStream();
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode, width: { ideal: 1280 }, height: { ideal: 1280 } },
//           audio: false,
//         });
//         if (cancelled) {
//           stream.getTracks().forEach((t) => t.stop());
//           return;
//         }
//         streamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play().catch(() => {});
//         }
//         const track = stream.getVideoTracks()[0];
//         const caps = track.getCapabilities ? track.getCapabilities() : {};
//         setTorchSupported(!!caps.torch);
//         setReady(true);
//       } catch (err) {
//         if (!cancelled) setError("Camera unavailable. You can upload a photo instead.");
//       }
//     }

//     start();
//     return () => {
//       cancelled = true;
//       stopStream();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [facingMode]);

//   function stopStream() {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }
//   }

//   async function toggleTorch() {
//     const track = streamRef.current?.getVideoTracks?.()[0];
//     if (!track || !torchSupported) return;
//     try {
//       await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
//       setTorchOn(!torchOn);
//     } catch {
//       // torch control not supported on this device
//     }
//   }

//   function flipCamera() {
//     setFacingMode((m) => (m === "environment" ? "user" : "environment"));
//   }

//   function takePhoto() {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas) return;
//     const w = video.videoWidth || 720;
//     const h = video.videoHeight || 1280;
//     canvas.width = w;
//     canvas.height = h;
//     const ctx = canvas.getContext("2d");
//     if (facingMode === "user") {
//       ctx.translate(w, 0);
//       ctx.scale(-1, 1);
//     }
//     ctx.drawImage(video, 0, 0, w, h);
//     const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
//     stopStream();
//     onCapture(dataUrl);
//   }

//   function handleFileFallback(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       stopStream();
//       onCapture(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between text-white">
//       {/* Top Bar Controls */}
//       <div className="flex items-center justify-between px-4 pt-4 pb-3 relative z-10 bg-black/40 backdrop-blur-sm">
//         <button
//           onClick={toggleTorch}
//           disabled={!torchSupported}
//           className={`w-9 h-9 rounded-full flex items-center justify-center ${
//             torchSupported ? "bg-black/40 text-white" : "bg-black/20 text-white/30"
//           }`}
//           aria-label="Toggle flash"
//         >
//           {torchOn ? <Zap size={18} /> : <ZapOff size={18} />}
//         </button>
//         <button
//           onClick={flipCamera}
//           className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
//           aria-label="Flip camera"
//         >
//           <RefreshCw size={18} />
//         </button>
//         <button
//           onClick={() => {
//             stopStream();
//             onClose();
//           }}
//           className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
//           aria-label="Close camera"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* Camera Preview Viewport */}
//       <div className="flex-1 relative overflow-hidden bg-gray-900 flex items-center justify-center">
//         <video
//           ref={videoRef}
//           playsInline
//           muted
//           className={`w-full h-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
//         />

//         {!ready && !error && (
//           <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
//             Starting camera…
//           </div>
//         )}

//         {/* Camera Unavailable Error Fallback View */}
//         {error && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 text-sm px-8 text-center bg-slate-950">
//             <CameraIcon size={44} className="text-gray-500 mb-1" />
//             <p className="text-sm text-gray-300 max-w-xs">{error}</p>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition"
//             >
//               Choose photo
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Bottom Control Bar with Shutter & Choose Photo Option */}
//       <div className="h-28 bg-black flex items-center justify-between px-8 relative z-10 shrink-0">
//         <div className="w-12" />

//         {/* Main Shutter Button */}
//         <button
//           onClick={takePhoto}
//           disabled={!ready}
//           aria-label="Capture photo"
//           className="w-16 h-16 rounded-full bg-gray-400 border-4 border-white active:scale-95 transition disabled:opacity-40"
//         />

//         {/* Bottom Right Choose Photo Button */}
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="flex flex-col items-center text-emerald-400 active:opacity-75 transition"
//         >
//           <ImageIcon size={22} />
//           <span className="text-[10px] mt-1 font-medium">Choose photo</span>
//         </button>
//       </div>

//       <canvas ref={canvasRef} className="hidden" />
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleFileFallback}
//       />
//     </div>
//   );
// }








import React, { useEffect, useRef, useState } from "react";
import { X, Zap, ZapOff, RefreshCw, Camera as CameraIcon, Image as ImageIcon } from "lucide-react";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [facingMode, setFacingMode] = useState("environment");
  const [torchOn, setTorchOn] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setReady(false);
      setError(null);
      stopStream();

      // Laptop/Mobile flexible video constraints
      const constraintsOptions = [
        { video: { facingMode }, audio: false },
        { video: true, audio: false } // Fallback for Laptops / Desktop Webcams
      ];

      let stream = null;
      for (const constraints of constraintsOptions) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (stream) break;
        } catch (err) {
          console.warn("Retrying camera access with fallback constraints...", err);
        }
      }

      if (cancelled) {
        if (stream) stream.getTracks().forEach((t) => t.stop());
        return;
      }

      if (stream) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch (e) {
            console.error("Autoplay issue:", e);
          }
        }
        const track = stream.getVideoTracks()[0];
        const caps = track.getCapabilities ? track.getCapabilities() : {};
        setTorchSupported(!!caps.torch);
        setReady(true);
      } else {
        setError("Camera unavailable. You can upload a photo instead.");
      }
    }

    start();
    return () => {
      cancelled = true;
      stopStream();
    };
  }, [facingMode]);

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  async function toggleTorch() {
    const track = streamRef.current?.getVideoTracks?.()[0];
    if (!track || !torchSupported) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torchOn }] });
      setTorchOn(!torchOn);
    } catch {
      // torch control not supported
    }
  }

  function flipCamera() {
    setFacingMode((m) => (m === "environment" ? "user" : "environment"));
  }

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const w = video.videoWidth || 720;
    const h = video.videoHeight || 1280;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (facingMode === "user") {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    stopStream();
    onCapture(dataUrl);
  }

  function handleFileFallback(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      stopStream();
      onCapture(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between text-white">
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 relative z-10 bg-black/40 backdrop-blur-sm">
        <button
          type="button"
          onClick={toggleTorch}
          disabled={!torchSupported}
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            torchSupported ? "bg-black/40 text-white" : "bg-black/20 text-white/30"
          }`}
          aria-label="Toggle flash"
        >
          {torchOn ? <Zap size={18} /> : <ZapOff size={18} />}
        </button>
        <button
          type="button"
          onClick={flipCamera}
          className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
          aria-label="Flip camera"
        >
          <RefreshCw size={18} />
        </button>
        <button
          type="button"
          onClick={() => {
            stopStream();
            onClose();
          }}
          className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
          aria-label="Close camera"
        >
          <X size={18} />
        </button>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative overflow-hidden bg-gray-900 flex items-center justify-center">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`w-full h-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
        />

        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
            Starting camera…
          </div>
        )}

        {/* Error Fallback (9.png Style) */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 text-sm px-8 text-center bg-slate-950">
            <CameraIcon size={44} className="text-gray-500 mb-1" />
            <p className="text-sm text-gray-300 max-w-xs">{error}</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition"
            >
              Choose photo
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar: Shutter + Bottom Right "Choose Photo" */}
      <div className="h-28 bg-black flex items-center justify-between px-8 relative z-10 shrink-0">
        <div className="w-12" />

        {/* Capture Button */}
        <button
          type="button"
          onClick={takePhoto}
          disabled={!ready}
          aria-label="Capture photo"
          className="w-16 h-16 rounded-full bg-gray-400 border-4 border-white active:scale-95 transition disabled:opacity-40"
        />

        {/* Choose Photo Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center text-emerald-400 active:opacity-75 transition"
        >
          <ImageIcon size={22} />
          <span className="text-[10px] mt-1 font-medium">Choose photo</span>
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        acgradlew assembleDebugcept="image/*"
        className="hidden"
        onChange={handleFileFallback}
      />
    </div>
  );
}