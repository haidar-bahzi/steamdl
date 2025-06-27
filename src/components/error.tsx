import Image from "next/image";

export default function ErrorSearchPage() {
  return (
    <div className="flex flex-col justify-center items-center container-child">
      <p className="text-3xl lg:text-4xl text-white font-bold">Sorry!</p>

      <Image
        src="/error.webp"
        alt="Error Thumbnail"
        width={400}
        height={300}
        className="my-4"
      />

      <p className="px-4 lg:px-0 lg:text-xl text-center">
        There was a problem accessing the item. Please try again.
      </p>
    </div>
  );
}
