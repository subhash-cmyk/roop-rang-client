import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { productAPI, getImageUrl } from "../services/api";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Store,
} from "lucide-react";

export default function App() {
  const [product, setProduct] = useState<any>(null);
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] =
    useState<string | null>("description");

  useEffect(() => {
    fetchProduct();
  }, []);

  const [loading, setLoading] = useState(true);

const fetchProduct = async () => {
  try {
    setLoading(true);

    const res = await productAPI.get(Number(id));
    setProduct(res);
  } catch (error) {
    console.error(error);
    setProduct(null);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!product) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Product not found
    </div>
  );
}

  const accordionItems = [
    {
      key: "description",
      title: "Description",
      value: product.description,
    },
    {
      key: "ingredients",
      title: "Ingredients",
      value: product.ingredients,
    },
    {
      key: "howToUse",
      title: "How to use",
      value: product.howToUse,
    },
  ];
  const whatsappBuy = () => {
    const text = encodeURIComponent(
      `Hi, I would like to buy ${product.name} for Rs. ${product.sellingPrice}.`
    );

    window.open(
      `https://wa.me/917096241594?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#24211e]">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-7 sm:px-8 lg:px-12 lg:pb-28 lg:pt-10">
        <button
          onClick={() => window.history.back()}
          className="group mb-7 inline-flex items-center gap-2.5 text-sm font-medium text-[#67615b] transition-colors hover:text-[#9a613a] lg:mb-10"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ded8cf] bg-white transition-transform group-hover:-translate-x-1">
            <ArrowLeft size={17} strokeWidth={1.8} />
          </span>
          Back to collection
        </button>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(430px,0.92fr)] lg:gap-16 xl:gap-24">
          {/* Gallery */}
          <section
            className="lg:sticky lg:top-8"
            aria-label="Product gallery"
          >
            <div className="gallery-layout">
              <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
                {product.images.map((image: any, index: number) => (
                  <button
                    key={image.url}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-sm bg-[#eee9e2] transition-all duration-300 lg:h-[92px] lg:w-[76px] ${activeImage === index
                        ? "ring-1 ring-[#49392e] ring-offset-3 ring-offset-[#fbfaf7]"
                        : "opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={getImageUrl(image.url)}
                      alt={image.alt || product.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="relative order-1 aspect-[4/4.55] min-h-[430px] overflow-hidden bg-[#eee9e2] lg:order-2 lg:min-h-[620px]">
                <div className="absolute left-5 top-5 z-10 bg-[#29241f] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  {product.discount}% off
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={getImageUrl(product.images?.[activeImage]?.url)}
                    alt={product.images?.[activeImage]?.alt || product.name}
                    initial={{ opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/10 to-transparent" />

                <div className="absolute bottom-5 right-5 text-[11px] font-medium tracking-[0.12em] text-white drop-shadow-md">
                  0{activeImage + 1} / 0{product.images.length}
                </div>
              </div>
            </div>
          </section>

          {/* Product Details */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:pt-5"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a56b43]">
              Roop Rang / {product.category?.name}
            </p>

            <h1 className="font-display max-w-xl text-[46px] font-medium leading-[0.98] tracking-[-0.03em] text-[#28231f] sm:text-6xl lg:text-[64px]">
              {product.name}
            </h1>

            <div className="mt-7 flex items-baseline gap-3 border-b border-[#ded8cf] pb-8">
              <span className="text-3xl font-semibold tracking-tight">
                ₹{product.sellingPrice}
              </span>

              {product.mrp > product.sellingPrice && (
                <span className="text-base text-[#999087] line-through">
                  ₹{product.mrp}
                </span>
              )}

              <span className="ml-1 text-xs text-[#7c756f]">
                Inclusive of all taxes
              </span>
            </div>

            <div className="divide-y divide-[#ded8cf]">
              {accordionItems.map((item) => (
                <div key={item.key}>
                  <button
                    onClick={() =>
                      setOpenSection(
                        openSection === item.key ? null : item.key
                      )
                    }
                    className="flex w-full items-center justify-between py-5 text-left"
                    aria-expanded={openSection === item.key}
                  >
                    <span className="text-[15px] font-semibold">
                      {item.title}
                    </span>

                    {openSection === item.key ? (
                      <ChevronUp size={18} strokeWidth={1.6} />
                    ) : (
                      <ChevronDown size={18} strokeWidth={1.6} />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openSection === item.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-[14px] leading-7 text-[#6f6861]">
                          {item.value}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 border-y border-[#ded8cf] py-5 text-sm">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#938a82]">
                  SKU
                </p>
                <p className="font-medium">{product.sku || "-"}</p>
              </div>

              <div className="border-l border-[#ded8cf] pl-6">
                <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[#938a82]">
                  Availability
                </p>

                <p className="flex items-center gap-1.5 font-medium text-[#527052]">
                  <Check size={13} strokeWidth={2.5} />
                  {product.stock > 0
                    ? `In stock (${product.stock})`
                    : "Out of stock"}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                onClick={whatsappBuy}
                className="flex min-h-14 items-center justify-center gap-2.5 bg-[#29241f] px-5 text-sm font-semibold text-white transition-all hover:bg-[#a56b43]"
              >
                <MessageCircle size={18} strokeWidth={1.8} />
                Buy on WhatsApp
              </button>

              <a
                href="tel:+917096241594"
                className="flex min-h-14 items-center justify-center gap-2.5 border border-[#a56b43] px-5 text-sm font-semibold text-[#6f452b] transition-colors hover:bg-[#f1e7dd]"
              >
                <Phone size={17} strokeWidth={1.8} />
                Call store
              </a>
            </div>

            <div className="mt-9 grid gap-4 text-[13px] text-[#6f6861] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#a56b43]"
                />
                100% authentic
              </div>

              <div className="flex items-center gap-2.5">
                <Store
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#a56b43]"
                />
                Surat pickup
              </div>

              <div className="flex items-center gap-2.5">
                <RotateCcw
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#a56b43]"
                />
                Easy returns
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}