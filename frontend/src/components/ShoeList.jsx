import { useQuery } from "react-query";
import shoesData from "../shoes.json"
import { SingleShoes } from "./SingleShoe";

export const ShoeList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["shoes"],
    queryFn: () => Promise.resolve({ data: shoesData }),
  });
  if (!isLoading && data.data) {
    return (
      <div className="card">
          <img src="/nike.png" className="nike" />
          <div className="products">Our Products</div>
          <div className="card-body relative">
            {data.data.shoes.map((shoe) => {
              return <SingleShoes key={shoe.id} 
              data={shoe}/>;
            })}
          </div>
      </div>
    );
  }
  return null;
};
