import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";

// eslint-disable-next-line react/prop-types
const FeaturedProducts = () => {
	return (
		<div className="pt-24 ">
			<SectionTitle text="featured products" />
			<ProductsGrid />
		</div>
	);
};
export default FeaturedProducts;
