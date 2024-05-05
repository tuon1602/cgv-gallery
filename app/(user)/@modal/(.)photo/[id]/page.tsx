import { getImageDetail } from "@/app/actions/imageActions";
import Modal from "./_components/Modal";
import PhotoDetails from "./_components/PhotoDetails";
import { getCommentByImageId } from "@/app/actions/commentActions";
import { Toaster } from "sonner";
export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const imageDetail = await getImageDetail(params.id);
  const getCommentById = await getCommentByImageId(params.id)
  return (
    <Modal>
      <PhotoDetails
        imageDetailData={imageDetail}
        imageId={params.id}
        comments={getCommentById}
      />
      <Toaster richColors position="top-center"/>
    </Modal>
  );
}
