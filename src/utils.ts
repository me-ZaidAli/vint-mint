const { fetchVintedCatalogue } = require("./api/fetch-product-catalog");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function extractProducts() {
  try {
    let products: {
      id: number;
      likes: number;
      link: any;
      imageUrl: any;
      name: any;
      brand: any;
      price: any;
      size: any;
      condition: any;
      fullDescription: any;
    }[] = [];

    const htmlContent = await fetchVintedCatalogue();

    const { document } = new JSDOM(htmlContent).window;
    console.log("🌐 Loading HTML content...");
    console.log(`📊 HTML size: ${htmlContent.length} characters\n`);

    const productElements = document.querySelectorAll(
      '[data-testId="grid-item"]'
    );

    productElements.forEach((product: any, index: number) => {
      const productLikes = +product.querySelector(
        "button span.web_ui__Text__caption"
      ).textContent;

      if (productLikes >= 15) {
        const productImgTag = product.querySelector("img");
        const altText = productImgTag.getAttribute("alt");
        const imgSrc = productImgTag.getAttribute("src");

        const productLink = product.querySelector("a").getAttribute("href");

        const productInfo = parseProductInfo(altText);

        const createdProduct = {
          id: index + 1,
          likes: +productLikes || 0,
          link: productLink || "",
          imageUrl: imgSrc,
          name: productInfo.name || "Unknown Item",
          brand: productInfo.brand || "Unknown Brand",
          price: productInfo.price || "Price not found",
          size: productInfo.size || "Size not specified",
          condition: productInfo.condition || "Condition not specified",
          fullDescription: altText,
        };

        products.push(createdProduct);
      }
    });

    return products;
  } catch (error) {
    console.error("❌ Error reading HTML file:", error);
  }
}

function parseProductInfo(altText: string) {
  const info: any = {};

  // Extract product name (usually before the first comma)
  const nameMatch = altText.match(/^([^,]+)/);
  if (nameMatch && nameMatch[1]) {
    info.name = nameMatch[1].trim();
  }

  const brandMatch = altText.match(/brand:\s*([^,]+)/i);
  if (brandMatch && brandMatch[1]) {
    info.brand = brandMatch[1].trim();
  }

  const sizeMatch = altText.match(/size:\s*([^,]+)/i);
  if (sizeMatch && sizeMatch[1]) {
    info.size = sizeMatch[1].trim();
  }

  const conditionMatch = altText.match(/condition:\s*([^,]+)/i);
  if (conditionMatch && conditionMatch[1]) {
    info.condition = conditionMatch[1].trim();
  }

  const priceMatch = altText.match(/£\d+(?:\.\d{2})?/);
  if (priceMatch && priceMatch[0]) {
    info.price = priceMatch[0];
  }

  return info;
}

function displayProducts(products: any[]) {
  console.log("🎯 EXTRACTED PRODUCTS FROM VINTED UK HOMEPAGE");
  console.log("=============================================\n");

  if (products.length === 0) {
    console.log("❌ No products found");
    return;
  }

  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   🏷️  Brand: ${product.brand}`);
    console.log(`   💰 Price: ${product.price}`);
    console.log(`   📏 Size: ${product.size}`);
    console.log(`   🔧 Condition: ${product.condition}`);
    console.log(`   📸 Image: ${product.imageUrl}`);
    console.log(`   📝 Full Description: ${product.fullDescription}`);
    console.log("");
  });

  console.log(`📊 Total products extracted: ${products.length}`);
  console.log(
    "\n💡 Note: Product information is extracted from the Vinted UK homepage"
  );
  console.log(
    "   which shows trending/featured items, not necessarily the latest listings."
  );
}

module.exports = {
  extractProducts,
  parseProductInfo,
  displayProducts,
};
