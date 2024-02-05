import { Minus } from "lucide-react";

export default function About() {
  return (
    <main className="max-w-[1200px] px-5 mx-auto mt-6">
      <section className="text-gray-800 py-5">
        <div>
          <div className="text-center mb-5 pt-4">
            <div className="mx-auto">
              <h1 className="font-bold mb-3 text-[40px]">About us</h1>
              <p className="leading-2 w-full md:w-[75%] mx-auto">
                MobiMatter is an online re-seller and distributor of mobile
                telecom services. We help our users to discover, compare and
                purchase the best mobile offers by our partner mobile telecom
                operators from around the world.
              </p>
            </div>
          </div>
          <div>
            <div className="mt-10">
              <p className="font-semibold mb-3 block">
                Our objective is to provide a simple and transparent interface
                to enable our customers to:
              </p>
              <ul className="mb-3 pl-3">
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Discover the latest mobile offers and promotions they can use
                  on in their country of residence
                </li>
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Find the most convenient and affordable options to stay online
                  while travelling abroad
                </li>
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Conveniently pay online and get instant activation
                </li>
              </ul>
              <p className="font-semibold mb-3 block">
                We integrate with our partner network&apos;s systems through
                secure links, so our users can:
              </p>
              <ul className="mb-3 pl-3">
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Enjoy immediate activation of services and add-ons on their
                  existing lines;
                </li>
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Get instant delivery and activation instructions of newly
                  purchased eSIMs;
                </li>
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Order new physical SIMs with multiple delivery options;
                </li>
                <li>
                  <Minus
                    className="text-[#38BDEF] inline mb-1 mr-2 w-4"
                    strokeWidth={6}
                  />
                  Recharge their balance and pay their bills;
                </li>
              </ul>
              <p>
                We follow service providers’ prevailing practices for online
                sales and comply fully with any commercial and legal
                requirements requested by them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
