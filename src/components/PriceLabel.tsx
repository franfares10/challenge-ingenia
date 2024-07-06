type PriceLabelProps = {
  price: number;
  currency: string;
}

export const PriceLabel = ({ price, currency }: PriceLabelProps) => {
  return (
    <p className='font-bold text-xl' role="contentinfo">
      {Number(price).toLocaleString('es-AR', {
        style: 'currency',
        currency: currency || 'ARS',
      })}
    </p>
  );
};
