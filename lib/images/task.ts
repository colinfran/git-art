import { utapi } from "./init"

export const uploadImage = async (fileUrl: string): Promise<string | undefined> => {
  try {
    const uploadedFile = await utapi.uploadFilesFromUrl(fileUrl)
    if (uploadedFile?.data?.url) {
      return uploadedFile.data.url
    } else {
      throw Error()
    }
  } catch (error) {
    console.error(error)
  }
}
