# react-dpd-pickup-map

React component for implementing a DPD Pickup Map

## Installation

Install react-dpd-pickup-map with npm

```bash
  npm install react-dpd-pickup-map
```

## Usage/Examples

```typescript
import ReactDPDPickupMap from 'react-dpd-pickup-map'

function App() {
  return <ReactDPDPickupMap
    authKey='YOUR_AUTH_KEY' //<- Your own auth key for pudofinder.dpd.com.pl
    lang='pl' //<- Defaults to: pl
    country='PL' //<- Defaults to: PL
    services={{
        openSaturdays=true
        openSundays=true
    }}
  />
}
```

## Available services

| Parameter            | Type      | Default | Description                                    |
| :------------------- | :-------- | :------ | :--------------------------------------------- |
| `openLate`           | `boolean` | `false` | Points open Late                               |
| `openSaturdays`      | `boolean` | `false` | Points open in Saturdays                       |
| `openSundays`        | `boolean` | `false` | Points open in Sundays                         |
| `disabledFriendly`   | `boolean` | `false` | Points friendly for disabled people            |
| `parking`            | `boolean` | `false` | Points with parking                            |
| `directDelivery`     | `boolean` | `false` | Direct delivery                                |
| `directDeliveryCOD`  | `boolean` | `false` | Direct delivery with cash on delivery          |
| `dropOffOnline`      | `boolean` | `false` | Sending a paid shipment                        |
| `dropOffOffline`     | `boolean` | `false` | Points with on-site shipping + payment and BOD |
| `swapParcel`         | `boolean` | `false` | Points with return shipment                    |
| `dpdFood`            | `boolean` | `false` | Points with DPD Food                           |
| `fittingRoom`        | `boolean` | `false` | Points with fitting room                       |
| `cardPayment`        | `boolean` | `false` | Points with card payment                       |
| `rod`                | `boolean` | `false` | Point with return documents                    |
| `dpdLQ`              | `boolean` | `false` | DPD LG                                         |
| `digitalLabel`       | `boolean` | `false` | Point with shipping without a label            |
| `swipBox`            | `boolean` | `false` | Parcela machines                               |
| `pointsWithServices` | `boolean` | `false` | Points with services                           |

## Authors

- [@Imunal](https://github.com/Imunal)
