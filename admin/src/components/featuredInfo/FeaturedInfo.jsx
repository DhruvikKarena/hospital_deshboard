import "./featuredInfo.css";

export default function FeaturedInfo() {

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Vacant Beds</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{JSON.parse(localStorage.getItem("user")).vacant_bed}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Beds</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{JSON.parse(localStorage.getItem("user")).total_bed}</span>
        </div>
      </div>
    </div>
  );
}
