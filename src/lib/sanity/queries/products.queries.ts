const productFields = `
  _id,
  title,
  "slug": slug.current,
  productCode,
  shortDescription,
  featured,
  "image": images[0].asset->url,
  "category": category->{
    title,
    "slug": slug.current,
    icon,
    color,
    categoryType,
    "parentCategory": parentCategory->{ title, "slug": slug.current }
  }
`;

export const allProductsQuery = `
  *[_type == "product"] | order(title asc) {
    ${productFields}
  }
`;

export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $categorySlug] | order(title asc) {
    ${productFields}
  }
`;

export const allProductCategoriesQuery = `
  *[_type == "productCategory" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    color,
    categoryType,
    order,
    "parentCategory": parentCategory->{ _id, title, "slug": slug.current }
  }
`;

export const groupedProductCategoriesQuery = `
  *[_type == "productCategory" && categoryType == "major" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    color,
    order,
    "subCategories": *[
      _type == "productCategory" &&
      categoryType == "sub" &&
      isActive == true &&
      parentCategory._ref == ^._id
    ] | order(order asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      color,
      order
    }
  }
`;
