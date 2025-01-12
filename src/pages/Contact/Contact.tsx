import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

export default function Contact() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="px-5 md:px-20 lg:px-48 py-16 md:py-20 dark:text-white w-full">
        <Breadcrumbs />
        <div className="uppercase text-3xl md:4xl lg:text-5xl font-bold mb-14 mx-auto flex items-center justify-center">
          Contact us
        </div>
        <div className="px-4">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="uppercase font-semibold">
                Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                className="py-3 px-4 placeholder-primaryDark bg-primary border border-1 border-primaryDark focus:ring-0 rounded-md dark:bg-primaryDark dark:placeholder-gray-300 dark:border-gray-300"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="uppercase font-semibold">
                Email
              </label>
              <input
                className="py-3 px-4 placeholder-primaryDark bg-primary border border-1 border-primaryDark focus:ring-0 rounded-md dark:bg-primaryDark dark:placeholder-gray-300 dark:border-gray-300"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="uppercase font-semibold">
                Location
              </label>
              <select
                className="py-3 px-4 placeholder-primaryDark bg-primary border border-1 border-primaryDark focus:ring-0 rounded-md dark:bg-primaryDark dark:placeholder-gray-300 dark:border-gray-300"
                name="location"
                id=""
              >
                <option disabled value="1">
                  Select...
                </option>
                <option value="1">Location 1</option>
                <option value="2">Location 2</option>
                <option value="3">Location 3</option>
                <option value="4">Location 4</option>
                <option value="5">Location 5</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="uppercase font-semibold">
                Message
              </label>
              <textarea
                className="py-3 px-4 placeholder-primaryDark bg-primary border border-1 border-primaryDark focus:ring-0 rounded-md dark:bg-primaryDark dark:placeholder-gray-300 dark:border-gray-300"
                name="message"
                placeholder="Hello!"
                rows={4}
              />
            </div>
            <div>
              <button className="w-full bg-primaryDark text-primary uppercase font-semibold dark:bg-secondary dark:text-black py-3 rounded-md">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
