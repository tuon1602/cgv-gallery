import {
  getAllImageDirectFormDB,
  getImageDetail,
} from "@/actions/imageActions";
import Modal from "./_components/Modal";
import PhotoDetails from "./_components/PhotoDetails";
import { getCommentByImageId } from "@/actions/commentActions";
import { Toaster } from "sonner";
import { IGetAllImages } from "@/types";

export async function generateStaticParams() {
  const data: any = await getAllImageDirectFormDB();

  return data.map((image: any) => ({
    id: image.id.toString(),
  }));
}

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const imageDetail = await getImageDetail(params.id);
  const getCommentById = await getCommentByImageId(params.id);
  const [images,comments ] = await Promise.all([imageDetail,getCommentById])
  return (
    <>
      <Modal>
        <PhotoDetails
          imageDetailData={images}
          imageId={params.id}
          comments={comments}
        />
        <Toaster richColors position="top-center" />
      </Modal>
    </>
  );
}
