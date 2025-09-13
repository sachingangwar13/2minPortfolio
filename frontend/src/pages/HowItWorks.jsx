import React from "react";

function HowItWorks() {
  return (
    <section id="works" className="relative py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mx-auto mt-20 text-4xl font-extrabold text-white md:text-6xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 md:text-2xl">
            Create, customize, and share your professional portfolio instantly
            with Portfolio2Min.
          </p>
        </div>
        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 top-2 hidden md:block md:px-20 lg:px-28 xl:px-44">
            <img
              alt=""
              loading="lazy"
              width="1000"
              height="500"
              decoding="async"
              className="w-full"
              style={{ color: "transparent" }}
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
            />
          </div>
          <div className="relative grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-3">
            <div >
              <div className="ml-30 flex h-16 sm:ml-10 md:ml-20 w-16 xl:ml-30 items-center justify-center rounded-full border-2 border-gray-600 bg-green-500 shadow ">
                <span className="text-xl font-semibold text-white">1</span>
              </div>
              <h3 className="mt-6 text-xl leading-tight font-semibold text-white md:mt-10">
                Register on Portfolio2Min
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Create your free account in just a few minutes. All you need is
                your name, email, and a password to get started!
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-600 bg-green-500 shadow">
                <span className="text-xl font-semibold text-white">2</span>
              </div>
              <h3 className="mt-6 text-xl leading-tight font-semibold text-white md:mt-10">
                Complete Your Profile
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Add your details like personal info, work experience, skills,
                and projects. Customize your portfolio by choosing a theme that
                suits your style!
              </p>
            </div>
            <div>
              <div className=" flex h-16 w-16 items-center justify-center rounded-full border-2 sm:ml-20 md:ml-28 xl:ml-35 border-gray-600 bg-green-500 shadow">
                <span className="text-xl font-semibold text-white">3</span>
              </div>
              <h3 className="mt-6 text-xl leading-tight font-semibold text-white md:mt-10">
                Publish & Share
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Publish your profile to get a professional portfolio link. Share
                it with clients, employers, or friends, and let us know your
                feedback!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 m-auto h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
        }}
      />
    </section>
  );
}

export default HowItWorks;
