import { toast } from "react-toastify";
import fire from "../../config/firebase";
import * as types from "../actionsTypes/fileFolderActionType";

// action for folders

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// action for files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

// action creator for folder

export const createFolder = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      toast.success("Folder created successfully.");
      dispatch(addFolder({ data: folderData, docId: folderId }));
      setSuccess(true);
    }).catch(() => {
      setSuccess(false);
    });
};

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(setLoading(false));
      dispatch(addFolders(foldersData));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// action creator for files

export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const fileData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(fileData));
    });
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      toast.success("File Created successfully");
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File Saved successfully!");
    })
    .catch(() => {
      toast.success("File Saved/Update successfully!");
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("uploading " + progress + "%");
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = {
        ...data,
        url: fileUrl,
      };
      fire
        .firestore()
        .collection("files")
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success("File uploaded successfully");
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};
