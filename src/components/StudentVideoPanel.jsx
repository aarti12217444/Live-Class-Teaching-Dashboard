// import { useEffect } from "react";
// import Peer from "simple-peer";
// import socket from "../socket";

// function StudentVideoPanel() {

  // useEffect(() => {
  //      console.log("mounted");
    // const peer = new Peer({
    //   initiator: false,
    //   trickle: false
    // });

    // peer.on("signal", (data) => {
    //   socket.emit("signal", data);
    // });

    // socket.on("signal", (data) => {
    //   peer.signal(data);
    // });

    // return () => {
    //   peer.destroy();
    //   socket.off("signal");
    // };

//   }, []);
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5">

//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Live Class
//         </h2>

//         <div className="flex items-center gap-3">
//           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//             Live
//           </span>

//           <button className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg text-sm">
//             ⛶ Full Screen
//           </button>
//         </div>
//       </div>

//       {/* Whiteboard Main Area */}
//       <div className="relative">

//         <div className="h-[550px] rounded-2xl border bg-slate-50 flex items-center justify-center text-slate-500 text-lg">

//           Whiteboard Shared By Teacher

//         </div>

//         {/* Floating Teacher Video */}
//         <div className="absolute bottom-4 right-4 w-64 h-40 bg-black rounded-xl border-4 border-white shadow-xl flex items-center justify-center text-white">

//           📹 Teacher Live Video

//         </div>

//       </div>

//     </div>
//   );
// }

// export default StudentVideoPanel;

import { useEffect } from "react";
import socket from "../socket";

function StudentVideoPanel() {
  useEffect(() => {
    socket.on("signal", (data) => {
      console.log("Signal Received:", data);
    });

    return () => {
      socket.off("signal");
    };
  }, []);

  return <div>Student Panel</div>;
}

export default StudentVideoPanel;