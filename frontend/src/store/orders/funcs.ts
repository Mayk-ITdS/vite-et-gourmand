export function calculateOrderPrice({
  unitPrice,
  persons,
  minPersons,
  city,
  distanceKm,
}: {
  unitPrice: number;
  persons: number;
  minPersons: number;
  city: string;
  distanceKm: number;
}) {
  const VAT_RATE = 0.1;
  const BASE_DELIVERY = 5;
  const KM_RATE = 0.59;

  const base = unitPrice * persons;

  const discountEligible = persons >= minPersons + 5;
  const discount = discountEligible ? base * 0.1 : 0;

  const delivery =
    city !== "Bordeaux" ? BASE_DELIVERY + distanceKm * KM_RATE : 0;

  const ht = base - discount;
  const tva = ht * VAT_RATE;
  const ttc = ht + tva + delivery;

  const round = (v: number) => Math.round(v * 100) / 100;

  return {
    base: round(base),
    discount: round(discount),
    delivery: round(delivery),
    ht: round(ht),
    tva: round(tva),
    ttc: round(ttc),
    discountEligible,
  };
}
