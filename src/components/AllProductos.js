import React from 'react'
import { Link } from 'react-router-dom'


const allproductos = [
  {
    order: 1,
    title: "Circuit Protection",
    img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fcktpro-btn.png?alt=media&token=26557e53-8704-4f88-bd42-f4e4f2add802",
  },
  {
    order: 2,
    title: "Control System",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fturnkey-btn.png?alt=media&token=588a645a-c5a3-49e8-9739-b352a971dadc',
  },
  {
    order: 3,
    title: "Elctromechanical",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fem-btn.png?alt=media&token=751b7ed5-b4e9-45c1-ae8a-2137923fcc6b',
  },
  {
    order: 4,
    title: "Enclouser & Accesories",
    img: "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fea-btn.png?alt=media&token=588b3238-84e6-4758-be80-de8b237eb48a",
  },
  {
    order: 5,
    title: "HVAC",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fhvac-btn.png?alt=media&token=e29b186c-4682-4508-95b6-6d88f4334e57',
  },
  {
    order: 6,
    title: "Hydaulics",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fhypn-btn.png?alt=media&token=b91dd940-231b-47fc-ac3c-aa800408a21c',
  },
  {
    order: 7,
    title: "Industrial Control",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Felmechic-btn.png?alt=media&token=85ebbadb-ef86-429a-9a3b-49ba6cd125b3',
  },
  {
    order: 8,
    title: "Interconnect Wire & Cable",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fintwc-btn.png?alt=media&token=214d4e2b-02e0-4230-9dae-923aa611c0a0',
  },
  {
    order: 8,
    title: "Lamps Indicators & display",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Foptoelec-btn.png?alt=media&token=91c36fbc-f4aa-4244-abcd-05cd8a67e055',
  },
  {
    order: 9,
    title: "Lighting",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Flighting-btn.png?alt=media&token=540cca63-b2f0-42e1-b8ac-9bc4d28b5334',
  },
  {
    order: 10,
    title: "Motors Drivers & Accesories",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fmotrdriv-btn.png?alt=media&token=719ba7a4-6084-4d3e-8634-2a627bd00532',
  },
  {
    order: 11,
    title: "Networking & Comunication",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fnetcom-btn.png?alt=media&token=7daa8df7-2222-438c-b0a7-abdb84530536',
  },
  {
    order: 12,
    title: "Passive Components",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fpassive-btn.png?alt=media&token=9ded337b-a91c-412d-8af5-a33042f01d67',
  },
  {
    order: 13,
    title: "Power & Electrical",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fpe-btn.png?alt=media&token=e5bb7983-332c-4f1b-91a5-376760698f85',
  },
  {
    order: 14,
    title: "Process Instrumentation",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Finst-btn.png?alt=media&token=6b795f3c-38d7-4407-a149-0eddc7385ef0',
  },
  {
    order: 15,
    title: "Safety & Signaling",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fsafesig-btn.png?alt=media&token=e21b3494-7ea2-4eaf-a663-fdeee46abcda',
  },
  {
    order: 16,
    title: "Semiconductors",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fsemicond-btn.png?alt=media&token=8c38ff7f-f7c4-4492-bcb7-546404936bb3',
  },
  {
    order: 17,
    title: "Test & Measurement",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Ftm-btn.png?alt=media&token=492b35ff-6a09-4208-bbf7-5c53001072c5',
  },
  {
    order: 18,
    title: "Tools Hardware & Supplies",
    img: 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/testAllproductos%2Fthse-btn.png?alt=media&token=2645ba62-418f-416b-beae-449ebff47bff',
  },
  
]

const products = (
        allproductos.map(item => {
          return(
            <Link key={item.order} className="content--products">
              <div className="text-center">
                  <img src={item.img} alt={item.title} />
                  <span>{item.title}</span>
              </div>
            </Link>
          )
        })
)


const AllProductos = () => {
  return(
    <div id="allproducts">
      <div className="all--products-title mt-4 mb-4">
          <h2 className="text-center">Cátegorias</h2>
      </div>
      <div className="all--products--container mb-4">
          {/* <span>Contenedor</span> */}
          { products }
      </div>
    </div>
  )
}


export default AllProductos