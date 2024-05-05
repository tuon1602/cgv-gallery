export default function PhotosLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
      <div id="modal-root" />
    </>
  )
}