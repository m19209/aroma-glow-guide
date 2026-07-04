import { Product, BOTTLE_IMAGES } from "@/lib/product-data";

export function Bottle({ variant, label }: { variant: Product["bottle"]; label: string }) {
  return (
    <img
      className="pbottle"
      src={BOTTLE_IMAGES[variant]}
      alt={label}
      loading="lazy"
      width={1024}
      height={1024}
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
  );
}
