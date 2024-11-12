import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <div className="pdp">
      <div className="pd-image">
        <Skeleton height="30em" />
      </div>
      <div className="product-details">
        <h1 className="title"><Skeleton width="100%" /></h1>
        <h2><Skeleton width={100} /></h2>
        <a className="title">Product description</a>
        <p className="details"><Skeleton count={3} /></p>
        <a className="title">Dimensions</a>
        <br />
        <br />
        <div className="dimensions">
          <div>
            <a className="title">Height</a>
            <br />
            <a className="details"><Skeleton width={50} /></a>
          </div>
          <div>
            <a className="title">Width</a>
            <br />
            <a className="details"><Skeleton width={50} /></a>
          </div>
        </div>
      </div>
    </div>
  )
}