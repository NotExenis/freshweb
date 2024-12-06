
export default function Login() {
  return (
    <section class="bg-gray-50 dark:bg-gradient-to-tr from-gray-800 from-40% via-gray-700 via-70% to-gray-800 to-85%">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="font-mono bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-primary-600 transition duration-300 ease-in block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-blue-500"
                  placeholder="email@email.com"
                >
                </input>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="font-mono bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-primary-600 transition duration-300 ease-in block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-blue-500"
                >
                </input>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <div class="flex items-center">
                      <label class="flex items-center cursor-pointer relative">
                        <input type="checkbox" class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-300 dark:border-gray-600 checked:bg-blue-600 checked:border-blue-600" id="check1" />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium dark:text-white hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <div class="flex flex-col items-center">
                <button
                    type="submit"
                    class="w-44 h-10 text-white bg-blue-500 shadow-lg shadow-blue-500/50 bg-primary-600 hover:bg-primary-700 transition duration-100 ease-in hover:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
                  >
                    Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
