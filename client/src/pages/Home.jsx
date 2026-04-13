import banner from "../assets/banner.jpg";
import banner_mobile from "../assets/banner-mobile.jpg";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCategory = async () => {
        try {
            setLoading(true);

            const response = await api.get("/category/get-category");
            const subCategoryResponse = await api.post("/subcategory/get-subcategory");

            if (response.data.success) {
                setCategoryData(response.data.data);
            }

            if (subCategoryResponse.data.success) {
                setSubCategoryData(subCategoryResponse.data.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleRedirectProductListPage = (categoryId, categoryName) => {
        // 🛑 prevent click before data loads
        if (subCategoryData.length === 0) {
            console.log("Subcategory not loaded yet");
            return;
        }

        const subCategory = subCategoryData.find(
            (item) => item.category?._id === categoryId
        );

        // 🛑 prevent crash if no subcategory found
        if (!subCategory) {
            console.log("No subcategory found for:", categoryId);
            return;
        }

        const url = `/${categoryName
            .replaceAll(" ", "-")
            .replaceAll(",", "-")
            .replaceAll("&", "-")}-${categoryId}/${
            subCategory.name
        }-${subCategory._id}`;

        navigate(url);
    };

    return (
        <section className="bg-white">
            {/* Banner */}
            <div className="container mx-auto">
                <div className="w-full h-full min-h-48 bg-blue-100 rounded">
                    <img
                        src={banner}
                        alt="banner"
                        className="w-full h-full hidden lg:block"
                    />
                    <img
                        src={banner_mobile}
                        alt="banner mobile"
                        className="w-full h-full lg:hidden"
                    />
                </div>
            </div>

            {/* Category Grid */}
            <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {loading
                    ? new Array(12).fill(null).map((_, index) => (
                          <div
                              key={index}
                              className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                          >
                              <div className="bg-blue-100 min-h-24 rounded"></div>
                              <div className="bg-blue-100 h-8 rounded"></div>
                          </div>
                      ))
                    : categoryData.map((item) => (
                          <div
                              key={item._id}
                              className="w-full h-full cursor-pointer"
                              onClick={() =>
                                  handleRedirectProductListPage(
                                      item._id,
                                      item.name
                                  )
                              }
                          >
                              <div>
                                  <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-scale-down"
                                  />
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    );
}

export default Home;