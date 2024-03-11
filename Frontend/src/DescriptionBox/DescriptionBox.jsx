import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className="descriptionBoxNavigator">
        <div className="descriptionBoxNavBox">Description</div>
        <div className="descriptionBoxNavBox fade">Reviews (122)</div>
      </div>
      <div className="descriptionBoxDescription">
        <p>
          An e-commerce website is one that allows people to buy and sell
          physical goods, services, and digital products over the internet
          rather than at a brick-and-mortar location. Through an e-commerce
          website, a business can process orders, accept payments, manage
          shipping and logistics, and provide customer service.
        </p>
        <p>
          An e-commerce website is a digital storefront that allows users to buy
          and sell products and services online. E-commerce stands for
          electronic commerce, and it&apos;s the process of exchanging goods and
          services over the internet.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
