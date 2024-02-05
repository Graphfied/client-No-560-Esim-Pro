import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const content = [
  {
    title: "Introduction",
    sub: [
      {
        q: "What is eSIM?",
        ans: (
          <p>
            An eSIM profile contains carrier and network subscription
            information, just like a normal SIM card. However, instead of coming
            in the form of a physical chip, the operator profile information is
            downloaded directly into the eSIM chip in your phone.
            <span className="py-1 block"></span>
            This means your phone has to support eSIM if you want to use it.
          </p>
        ),
      },
      {
        q: "What is QR Code?",
        ans: (
          <p>
            A QR code is simply a representation of a download link plus
            activation code for your eSIM profile. It is used to easily connect
            to the eSIM server and download the eSIM profile to your phone.
            <span className="py-1 block"></span>
            It is easier to scan a QR code than typing a long string of text,
            but if for some reason you are unable to scan the QR code, you will
            have the option to activate your eSIM by entering the required
            information manually.
            <span className="py-1 block"></span>
            Please note that QR codes can be used only once. Once a QR code is
            scanned and an eSIM profile is downloaded, it cannot be used to
            download the same eSIM again, whether it is on the same or another
            device.
          </p>
        ),
      },
      {
        q: "Is my phone eSim capable?",
        ans: (
          <div>
            As the eSIM technology advances, it becomes more prominent and you
            can find many phone models supporting it. We tried to summarize it
            and compile a single list that contains most phone models.
            <br />
            The sure way you can verify if your phone is compatible:
            <br />
            <p className="font-medium pl-5 my-3">1. iPhone:</p>
            <p className="pl-10">
              1. Go to Settings -&gt; Cellular (or Mobile Data).
              <br />
              2. If you see &apos;Add Cellular Plan&apos; or &apos;Add Mobile
              Plan&apos;, the phone supports eSIM
            </p>
            <p className="font-medium pl-5 my-3">2. Samsung:</p>
            <p className="px-10">
              1. Go to Settings -&gt; Connections -&gt; SIM Card Manager.
              <br />
              2.If you see &apos;Add Mobile Plan&apos;, the phone supports eSIM
            </p>
            <p className="font-medium px-5 my-3">3. Google Pixel:</p>
            <p className="pl-10">
              1. Go Settings -&gt; Networks & Internet -&gt; SIMs -&gt;
              &apos;+Add more&apos;.
              <br />
              2. If you are using Pixel 3/3a or a later model, it will be there
              and that means the phone supports eSIM.
            </p>
            <p className="py-3">List of compatible phones:</p>
            <ol className="list-decimal pl-10">
              <li>
                <span className="font-medium">iPhones</span> introduced in Fall
                2018 and later (iPhone XS/XR and all newer models)
              </li>
              <li>
                <span className="font-medium">iPads:</span> 10.2, Air, Mini
                2019, Pro 11, Pro 12.9
              </li>
              <li>
                <span className="font-medium">Google Pixel</span> 3/3a and all
                the later models
              </li>
              <li>
                <span className="font-medium">Samsung</span> phones like Galaxy
                S20 and others.
              </li>
              <li>and many more.</li>
            </ol>
            <p className="my-3">
              See full list below.
              <span className="py-1 block"> </span>
              <span className="font-medium">
                IMPORTANT EXCEPTIONS
                <br />
                Some models have exceptions depending on models and markets.
                Operator-locked devices: If your device is locked to a specific
                carrier due to a contract, it needs to be unlocked first to be
                able to use the eSIMs sold on our platform.
              </span>
            </p>
            <ol className="list-decimal pl-10">
              <li className="font-medium">
                iPhone:
                <ol className="list-decimal pl-10">
                  <li className="my-3 font-normal">
                    iPhone models produced for the Chinese market have 2
                    physical SIM card slots and do not support eSIM. If your
                    iPhone can take 2 physical SIM cards you won&apos;t be able
                    to use eSIM.
                  </li>
                </ol>
              </li>
              <li className="font-medium">
                Samsung:
                <ol className="list-decimal pl-10">
                  <li className="my-3 font-normal">
                    Samsung restricts eSIM capability by software in some
                    markets and some model sub-variants. Always check for
                    individual phones by going to Settings-&gt; Connections
                    -&gt; SIM Card Manager. If you can see the &apos;Add Mobile
                    Plan&apos; tab in the eSIMs section, you can use eSIM.
                  </li>
                </ol>
              </li>
              <li className="font-medium">
                Operator locked devices:
                <ol className="list-decimal pl-10">
                  <li className="my-3 font-normal">
                    If your device is locked to a specific carrier due to a
                    contract, it needs to be unlocked first to be able to use
                    the eSIMs sold on our platform.
                  </li>
                </ol>
              </li>
            </ol>
            <p className="mb-3">Full List of supported phone models</p>
            <p className="font-medium my-3">Apple phones that support eSIM</p>
            <ol className="list-decimal pl-10">
              <li>iPhone XS</li>
              <li>iPhone XS Max</li>
              <li>iPhone XR</li>
              <li>iPhone 11</li>
              <li>iPhone 11 Pro</li>
              <li>iPhone 11 Pro Max</li>
              <li>iPhone 12 mini (coming soon to US)</li>
              <li>iPhone 12</li>
              <li>iPhone 12 Max</li>
              <li>iPhone 12 Max Pro</li>
              <li>iPhone 13 mini</li>
              <li>iPhone 13</li>
              <li>iPhone 13 Pro</li>
              <li>iPhone 13 Pro Max</li>
              <li>iPhone 14</li>
              <li>iPhone 14 Plus</li>
              <li>iPhone 14 Pro</li>
              <li>iPhone 14 Pro Max</li>
              <li>iPhone SE (2020)</li>
              <li>iPad Air (3rd Generation)</li>
              <li>iPad Pro (3rd Generation)</li>
              <li>iPad Mini (5th Generation)</li>
            </ol>
            <p className="font-medium my-3">GOOGLE PHONES THAT SUPPORT ESIM</p>
            <ol className="list-decimal pl-10">
              <li>Google Pixel 3/XL</li>
              <li>Google Pixel 3a/XL</li>
              <li>Google Pixel 4/XL</li>
              <li>Google Pixel 4A 5G</li>
              <li>Google Pixel 2/XL</li>
              <li>Google Pixel 5</li>
              <li>Google Pixel 5a</li>
              <li>Google Pixel 6</li>
              <li>Google Pixel 6 Pro</li>
            </ol>
            <p className="font-medium my-3">SAMSUNG PHONES THAT SUPPORT ESIM</p>
            <ol className="list-decimal pl-10">
              <li>Samsung Galaxy Fold</li>
              <li>Samsung Galaxy S20</li>
              <li>Samsung Galaxy S20+</li>
              <li>Samsung Galaxy S20 Ultra</li>
              <li>Samsung Galaxy Z Flip</li>
              <li>Samsung Galaxy S21</li>
              <li>Samsung Galaxy S21+</li>
              <li>Samsung Galaxy S21 Ultra</li>
              <li>Samsung Galaxy Fold</li>
              <li>Samsung Galaxy Z Fold2</li>
              <li>Samsung Galaxy Z Fold3</li>
              <li>Samsung Note 20+</li>
            </ol>
          </div>
        ),
      },
    ],
  },
  {
    title: "eSIM Activation and Setup",
    sub: [
      {
        q: "How to label the eSIM?",
        ans: (
          <p>
            Your phone will automatically label your eSIM. This may create a
            confusing situation where you don&apos;t know which one is the
            correct one or even label two eSIMs with the same label.
            <span className="py-1 block"> </span>
            <span className="font-medium">
              WE RECOMMEND LABELING YOUR ESIM WITH ITS ORDER NUMBER.
            </span>
            <span className="py-1 block"> </span>
            That way, you will know exactly what eSIM you are looking at. In
            addition, you will have easy access to the order number and you
            could easily check your usage and refer back to the eSIM in the app.
            <span className="py-1 block"> </span>
            You can add after that the name of the location it is for, how much
            data you have in the plan etc.
            <span className="py-1 block"> </span>
            <span className="font-medium">HOW TO DO IT:</span>
            <span className="py-1 block"> </span>
            Go to Settings-&gt;Cellular and click on the eSIM. Then click on
            &quot;Cellular Plan Label&qout; and change freely.{" "}
          </p>
        ),
      },
    ],
  },
  {
    title: "eSIM Managment",
    sub: [
      {
        q: "Can I add more data to my eSIM?",
        ans: (
          <p>
            It is possible to top-up the eSIM with additional packages for most
            of our major operator partners. You can do this from the Mobimatter
            App or at mobimatter.com/topup.
            <span className="py-1 block"></span>
            In the app go to your profile-&gt;My eSIMs and click on the eSIM you
            want to top up. Then click on the &apos;top up&apos; option.
            <span className="py-1 block"></span>
            For the website go to the top up section and choose a package from
            the same operator. When proceeding to payment enter the order number
            of the eSIM you want to top up (pay attention it is the right one!).
            <span className="py-1 block"></span>
            The top-up package does not require any activation steps, just
            continue using the eSIM as normal.
            <span className="py-1 block"></span>
            If the operator of the eSIM you bought does not support top-up, or
            you want to try a package from a different operator, you can simply
            buy a new package with a new eSIM profile.
          </p>
        ),
      },
    ],
  },
  {
    title: "Troubleshooting",
    sub: [
      {
        q: "Can I delete and rescan the eSIM QR again?",
        ans: (
          <p>
            <span className="font-medium">No</span> Only delete the eSIM from
            your phone if you are done using it and do not intend to use it
            anymore.
            <span className="py-2 block"> </span>
            If you have accidentally deleted your eSIM, please contact
            MobiMatter support and we&apos;ll do our best to assist you.
          </p>
        ),
      },
    ],
  },
  {
    title: "Payment and Invoice",
    sub: [
      {
        q: "I'm unable to pay for my purchase - payment failure",
        ans: (
          <p>
            Please make sure that you are not using any VPN, and that you have a
            strong internet connection. Please keep in mind that only 3D secure
            cards are accepted by our payment gateway.
          </p>
        ),
      },
      {
        q: "How do I get an invoice for my purchase?",
        ans: (
          <p>
            After purchase, you will receive an email with a link to generate an
            invoice.
          </p>
        ),
      },
    ],
  },
];

export default function Faq() {
  return (
    <div className="w-full min-h-screen">
      <div className="bg-darkblue h-[12rem] flex flex-col justify-center items-center">
        <Image alt="" height={100} width={100} src="/faq/lighthouse.svg" />
        <h2 className="text-white font-semibold text-center text-xl sm:text-3xl mt-4 px-5">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-6xl mx-auto my-5 px-3">
        {content.map((item, index) => (
          <Accordion key={index} type="single" collapsible className="mb-3">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[19px] px-3 rounded-md hover:bg-neutral-200 hover:no-underline text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                {/* Sub questions */}
                {item.sub.map((sub, index) => (
                  <Accordion
                    key={index}
                    type="single"
                    collapsible
                    className="mb-3"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="bg-white px-5 rounded-md font-normal text-base hover:no-underline text-left">
                        {sub.q}
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-8 rounded-b-md font-normal text-base">
                        {sub.ans}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
