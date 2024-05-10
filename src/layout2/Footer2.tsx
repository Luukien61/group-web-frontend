const Footer2 = () => {
  return (
    <footer className="py-12 bg-gray-50 xl:pt-24">
      <div className="w-full px-4 mx-auto max-w-8xl">
        <div className="grid gap-12 xl:grid-cols-6 xl:gap-18">
          <div className="col-span-2">
            <a href="https://flowbite.com/" className="flex mb-5">
              <img
                src="/app.png"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <p className="max-w-lg mb-3 text-gray-600 dark:text-gray-400">
              Flowbite is a library of interactive UI components built with
              Tailwind CSS that can get you started building websites faster and
              more efficiently.
            </p>
            <p className="max-w-lg text-gray-600 dark:text-gray-400">
              Code licensed{" "}
              <a
                href="https://github.com/themesberg/flowbite/blob/main/LICENSE.md"
                className="text-blue-600 dark:text-blue-500 hover:underline"
                rel="nofollow"
              >
                MIT
              </a>
              , docs{" "}
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                className="text-blue-600 hover:underline dark:text-blue-500"
                rel="nofollow"
              >
                CC BY 3.0
              </a>
              .
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
              Resources
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/blocks/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Flowbite Blocks
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/figma/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Figma Design
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/icons/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Flowbite Icons
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://chat.openai.com/g/g-y7yC35HB9-flowbite-gpt"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Flowbite GPT
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/pro/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Pro version
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
              Help and support
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/contact/"
                  rel="noreferrer nofollow"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Contact us
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://github.com/themesberg/flowbite/discussions"
                  rel="noreferrer nofollow"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Github discussions
                </a>
              </li>
              <li className="mb-4 flex items-center">
                <a
                  href="https://flowbite.com/work-with-us/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Work with us{" "}
                </a>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-2">
                  New
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
              Follow us
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="https://discord.gg/4eeurUVvTy"
                  rel="noreferrer nofollow"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Discord
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://github.com/themesberg/flowbite"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Github
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://twitter.com/zoltanszogyenyi"
                  rel="noreferrer nofollow"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Twitter/X
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.linkedin.com/in/zoltanszogyenyi/"
                  rel="noreferrer nofollow"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
              Legal
            </h3>
            <ul>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/license/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  License (EULA)
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/privacy-policy/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/terms-and-conditions/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://flowbite.com/brand/"
                  className="font-medium text-gray-600 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Brand guideline
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-black dark:border-gray-700 lg:my-12" />
        <span className="block text-center text-gray-600">
          © 2019-<span id="currentYear">2024</span>{" "}
          <a href="https://flowbite.com/">Flowbite™</a> is a registered
          trademark. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer2;
