const productFields = `
  _id,
  title,
  "slug": slug.current,
  productCode,
  shortDescription,
  featured,
  "image": coalesce(productImage.asset->url, productImages[0].asset->url),
  "productImage": productImage.asset->url,
  "productImages": productImages[].asset->url,
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

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $productSlug && category->slug.current == $categorySlug][0] {
    _id,
    title,
    "slug": slug.current,
    productCode,
    shortDescription,
    fullDescription,
    badgeLabel,
    keyFeatures,
    detailHighlightsSectionTitle,
    detailHighlights,
    specificationsIntro,
    technicalLeadNote,
    specifications,
    datasheetUrl,
    installationBookingUrl,
    documents[]{
      title,
      subtitle,
      "url": file.asset->url,
      "sizeBytes": file.asset->size,
      "fileName": file.asset->originalFilename
    },
    "productImage": productImage.asset->url,
    "productImages": productImages[].asset->url,
    "category": category->{
      title,
      "slug": slug.current,
      icon,
      color,
      "parent": parentCategory->{ title, "slug": slug.current }
    },
    "relatedManual": relatedProducts[]->{
      _id,
      title,
      "slug": slug.current,
      productCode,
      shortDescription,
      "categorySlug": category->slug.current,
      "imageUrl": coalesce(productImage.asset->url, productImages[0].asset->url)
    },
    "relatedSuggested": *[
      _type == "product" &&
      _id != ^._id &&
      category._ref == ^.category._ref
    ] | order(title asc) [0..8] {
      _id,
      title,
      "slug": slug.current,
      productCode,
      shortDescription,
      "categorySlug": category->slug.current,
      "imageUrl": coalesce(productImage.asset->url, productImages[0].asset->url)
    }
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

/** Major categories with aggregated product counts (products whose subcategory’s parent is this major). */
export const majorCategoriesWithProductCountQuery = `
  *[_type == "productCategory" && categoryType == "major" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    color,
    "productCount": count(*[
      _type == "product" &&
      defined(category) &&
      category->categoryType == "sub" &&
      category->parentCategory._ref == ^._id
    ])
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
