import {
  useEffect,
  useState,
} from "react";

import { getFiles } from "../services/fileService";

function StudentFilesPanel() {

  const [files, setFiles] = useState([]);
 

  const loadFiles = async () => {
  try {
    const data = await getFiles();

    setFiles(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadFiles();
}, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Shared Files
      </h2>

      <div className="space-y-3">

        {files.map((file) => (
          <div
            key={file._id}
            className="border rounded-xl p-3 flex items-center justify-between"
          >

            <div>
              <p className="font-medium text-slate-800">
                📄 {file.fileName}
              </p>

              <p className="text-sm text-slate-500">
                {file.fileSize}
              </p>
            </div>

            <a
              href={`http://localhost:5000/uploads/${file.filePath}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
            >
              Download
            </a>

          </div>
        ))}

      </div>

    </div>
  );
}

export default StudentFilesPanel;