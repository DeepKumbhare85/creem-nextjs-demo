import { CreemCheckout } from "@creem_io/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="pb-20">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Creem + Nextjs Demo
          </h1>
          <h2 className="mt-6 text-2xl text-gray-700 dark:text-gray-300">
            UI Kit bundle - $49 lifetime access
          </h2>

          <CreemCheckout
            productId="prod_2czDIlvk4ww7sxQVgZwbkX"
            checkoutPath="/api/checkout"
          >
            <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Buy Now
            </button>
          </CreemCheckout>
        </div>

        <div>
          <h2 className="mt-6 text-2xl text-gray-700 dark:text-gray-300">
            Image Generator SaaS - 29$/month
          </h2>
          <CreemCheckout
            productId="prod_5H4NxSJUifFkE1ljjRtowc"
            checkoutPath="/api/checkout"
          >
            <button className="mt-6 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Subscribe
            </button>
          </CreemCheckout>
        </div>
      </main>
    </div>
  );
}
