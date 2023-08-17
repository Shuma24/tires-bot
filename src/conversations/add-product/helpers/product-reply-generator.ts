import { ITires } from '../../../product/interfaces/product.interface';

export const productReplyGenerator = (product: Omit<ITires, 'images'>) => {
  const msg = `
<b>Так, я щось створив:</b>
    <b>id:</b> ${product.id};
    <b>name:</b> ${product.name};
    <b>description:</b> ${product.description};
    <b>price:</b> ${product.price} UAH;
    <b>type:</b> ${product.type};
    <b>radius:</b> R${product.radius};
    <b>width:</b> ${product.width};
    <b>height:</b> ${product.height}`;

  return msg;
};
