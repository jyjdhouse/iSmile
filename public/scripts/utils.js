export function deactivateClass(array) {
<<<<<<< HEAD
  //El array que llegan son los nombres de las clases de las funciónes
  // a las cuales quiero agregar el '#nombreClase-active'
  array.forEach((element) => {
    document
      .querySelector(`.${element}`)
      ?.classList.remove(`${element}-active`);
  });
}

export async function getLoggedUser() {
  let response = await (await fetch(`/api/user/getLoggedUserId`)).json();
  return response.ok ? response : undefined;
}

export function getDeepCopy(arg) {
  return JSON.parse(JSON.stringify(arg));
}

export function adaptProductsToBeListed(products) {
  // Copia profunda para poder editar valores
  products = getDeepCopy(products);
  // Ordeno el array
  products.sort((a, b) => b.id - a.id);
  products.forEach((product) => {
    // Aca itero para a cada color de cada producto dejarle las files armadas para pintar en front
    product.colors.forEach((color) => {
      color.files = product.files?.filter((file) => file.colors_id == color.id);
      // Lo ordeno
      color.files?.forEach((file) => {
        if (file.file_types_id == 2) {
          const indexToRemove = color.files.indexOf(file);
          color.files.splice(indexToRemove, 1); //Lo elimino
          color.files.splice(1, 0, file); //Lo pongo 2do
        }
      });
    });
  });
  return products;
=======
    //El array que llegan son los nombres de las clases de las funciónes
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`)?.classList.remove(`${element}-active`);
    });
}

export async function getLoggedUser() {
    let response = (await (await fetch(`/api/user/getLoggedUserId`)).json());
    return response.ok ? response : undefined;
};

export function getDeepCopy(arg) {
    return JSON.parse(JSON.stringify(arg));
}

export function adaptProductsToBeListed(products) {
    // Copia profunda para poder editar valores
    products = getDeepCopy(products);
    // Ordeno el array
    products.sort((a, b) => b.id - a.id);
    products.forEach(product => {
        // Aca itero para a cada color de cada producto dejarle las files armadas para pintar en front
        product.colors.forEach(color => {
            color.files = product.files?.filter(file => file.colors_id == color.id);
            // Lo ordeno
            color.files?.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = color.files.indexOf(file);
                    color.files.splice(indexToRemove, 1);//Lo elimino
                    color.files.splice(1, 0, file); //Lo pongo 2do
                }
            });
        })
    });
    return products
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

//Se fija si aparece en pantalla para poder hace algo
export function checkIfIsInScreen(percentege, cb, arg) {
<<<<<<< HEAD
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= percentege) {
          // Si aparece, invoco al cb
          cb(arg);
        }
      });
    },
    { threshold: percentege }
  );
=======
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= percentege) {
                // Si aparece, invoco al cb
                cb(arg);
            }
        });
    }, { threshold: percentege });
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Se fija si esta en desktop
export function isInDesktop() {
<<<<<<< HEAD
  return window.innerWidth >= 1024; // Mobile & Tablet
=======
    return window.innerWidth >= 1024 // Mobile & Tablet
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Formatea la fecha. Retorna dd/mm/yyyy
export function dateFormater(date) {
<<<<<<< HEAD
  // Dividir la fecha en año, mes y día
  var parts = date.split("-");
  var year = parts[0];
  var month = parts[1];
  var day = parts[2];
  // Devolver la fecha formateada
  return day + "-" + month + "-" + year;
=======
    // Dividir la fecha en año, mes y día
    var parts = date.split('-');
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    // Devolver la fecha formateada
    return day + '-' + month + '-' + year;
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// fecha del dia
export function getTodaysDate() {
<<<<<<< HEAD
  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el año, mes y día en formato YYYY-MM-DD
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
=======
    // Obtener la fecha actual
    const currentDate = new Date();

    // Obtener el año, mes y día en formato YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Devuelve true si es todo numerico el valor
export function isNumber(value) {
<<<<<<< HEAD
  return /^[0-9]*$/.test(value);
=======
    return /^[0-9]*$/.test(value);
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Devuelve true si es todo letras el valor
export function isLetter(value) {
<<<<<<< HEAD
  return /^[A-Za-z\s]+$/.test(value);
=======
    return /^[A-Za-z\s]+$/.test(value)
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Devuelve true si es todo numerico el valor
export function isFloat(value) {
<<<<<<< HEAD
  return /^[0-9]*\.?[0-9]*$/.test(value);
=======
    return /^[0-9]*\.?[0-9]*$/.test(value);
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Devuelve longitud del carro del usuario
export function getCartTotalProducts(user) {
<<<<<<< HEAD
  let cart;
  if (user) {
    cart = user.temporalCart?.temporalItems;
    return cart?.length;
  }
  cart = JSON.parse(localStorage.getItem("temporalCart")) || [];
  return cart?.length;
}

=======
    let cart;
    if (user) {
        cart = user.temporalCart?.temporalItems;
        return cart?.length;
    }
    cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
    return cart?.length
}


>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
// LOGICA DE CARRO

// Cuando tocan el boton del tick (sacan el producto del carro)
// Lo hago función porque lo uso tambien cuando se carga despues
export function handleRemoveCartBtnClick(userLogged) {
<<<<<<< HEAD
  const removingCartButtons = document.querySelectorAll(
    ".confirm-delete-product-container"
  );
  let totalProducts = document.querySelectorAll(".products-quantity");
  removingCartButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const card =
        btn.closest(".product-card-container") ||
        btn.closest(".add-cart-button-container") ||
        btn.closest(".product-card");
      //para llegar al id del producto ..
      const idProd = card.dataset.productid;
      card
        .querySelector(".loading-container")
        .classList.add("loading-container-active");
      if (userLogged) {
        //Si hay usuario le pego a la api
        await removeTempItemFromDB(idProd, userLogged); //Función que elimina el producto del carro
      } else {
        console.log("aca", idProd);
        removeProductfromLocaleCart(idProd);
      }
      // Remuevo el spinner loading
      card
        .querySelector(".loading-container")
        .classList.remove("loading-container-active");
      // Cambio los iconos
      card.querySelector(".quick-add-cart-btn")?.classList.remove("hidden");
      card.querySelector(".remove-cart-product")?.classList.add("hidden");
      // Le resto uno al numero del carro
      totalProducts.forEach(
        (num) =>
          (num.innerHTML = parseInt(num.innerHTML)
            ? parseInt(num.innerHTML) - 1
            : "")
      );
    });
  });
}

// Agrega el item en cuestion a la DB
export async function addTempItemToDB(prodId, user) {
  //Agrega producto a la db
  try {
    if (!user.temporalCart) {
      //Si no tenia carro, lo creo
      const formData = {
        userId: user.id,
        prodId,
      };
      let createdCart = await (
        await fetch(`${window.location.origin}/api/user/createTempCart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      ).json();

      // Actualizamos manualmente a user
      user.temporalCart = {
        id: createdCart.tempCart.id,
        temporalItems: [],
      };
      user.temporalCart.temporalItems.push({
        temporal_cart_id: createdCart.tempCart.id,
        products_id: prodId,
        quantity: 1,
      });
    } else {
      // Si tenia, tengo que agregarlo al carro que ya esta creado
      let cart = user.temporalCart.temporalItems;
      let prodIndex = cart.findIndex((item) => item.products_id == prodId); //busco si esta el prod que selecciónaron en el carro
      // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
      if (prodIndex < 0) {
        //Si NO esta lo agrego, si esta no pasa nada
        let response = await (
          await fetch(`${window.location.origin}/api/user/addTempItem`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tempCartId: user.temporalCart.id,
              prodId,
              userId: user.id,
            }),
          })
        ).json();
        // Agrego el producto a temporalItems parcial
        user.temporalCart.temporalItems.push({
          temporal_cart_id: user.temporalCart.id,
          products_id: prodId,
          quantity: 1,
        });
      }
    }
  } catch (error) {
    console.log("Falle en add: " + error);
  }
}
// Borra el item en cuestion de la DB
export async function removeTempItemFromDB(prodId, user) {
  await (
    await fetch(`${window.location.origin}/api/user/deleteTempItem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prodId,
        user,
      }),
    })
  ).json();
  // Lo borro del userLogged
  user.temporalCart.temporalItems = user.temporalCart.temporalItems.filter(
    (item) => item.products_id != prodId
  );
}
// Agrega el item en cuestion a localStorage
export function addProductToLocaleCart(prodId) {
  // Obtengo el carrito de sessionStorage
  const cart = JSON.parse(localStorage.getItem("temporalCart")) || [];

  // Verifico si el producto ya está en el carrito
  const productAlreadyInCart = cart.find((item) => item.products_id == prodId);
  if (productAlreadyInCart) {
    // Si el producto ya está en el carrito, no hago nada
    return;
  }

  // Agrego el producto al carrito
  cart.push({
    products_id: prodId,
    quantity: 1,
  });

  localStorage.setItem("temporalCart", JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Borra el item en cuestion de localStorage
export function removeProductfromLocaleCart(prodId) {
  // Obtengo el carrito de sessionStorage
  let cart = JSON.parse(localStorage.getItem("temporalCart")) || [];

  cart = cart.filter((prod) => prod.products_id != prodId);

  localStorage.setItem("temporalCart", JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Logica para pintar el boton que corresponda del carro en product Detail
export function checkIfProductIsInCartDetail() {
  const productCard = document.querySelector(".product-container");
  if (!productCard) return;
  const productId = productCard.dataset.productid;
  // Hace un find ==> encuentra si el producto esta en el carro
  let productAlreadyInCart;
  if (userLogged) {
    productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(
      (item) => item.products_id == productId
    );
  } else {
    let cart = JSON.parse(localStorage.getItem("temporalCart")) || [];
    productAlreadyInCart = cart.find((item) => item.products_id == productId);
  }
  if (productAlreadyInCart) {
    productCard.querySelector(".quick-add-cart-btn").classList.add("hidden");
    productCard
      .querySelector(".remove-cart-product")
      .classList.remove("hidden");
  }
=======
    const removingCartButtons = document.querySelectorAll('.confirm-delete-product-container');
    let totalProducts = document.querySelectorAll('.products-quantity');
    removingCartButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const card = btn.closest('.product-card-container') || btn.closest('.add-cart-button-container') || btn.closest('.product-card');
            //para llegar al id del producto ..
            const idProd = card.dataset.productid;
            card.querySelector('.loading-container').classList.add('loading-container-active');
            if (userLogged) {//Si hay usuario le pego a la api
                await removeTempItemFromDB(idProd, userLogged); //Función que elimina el producto del carro 
            } else {
                console.log('aca', idProd);
                removeProductfromLocaleCart(idProd)
            }
            // Remuevo el spinner loading
            card.querySelector('.loading-container').classList.remove('loading-container-active');
            // Cambio los iconos
            card.querySelector('.quick-add-cart-btn')?.classList.remove('hidden');
            card.querySelector('.remove-cart-product')?.classList.add('hidden');
            // Le resto uno al numero del carro
            totalProducts.forEach(num => num.innerHTML = parseInt(num.innerHTML) ? parseInt(num.innerHTML) - 1 : '');
        });
    });
};

// Agrega el item en cuestion a la DB
export async function addTempItemToDB(prodId, user) {//Agrega producto a la db
    try {
        if (!user.temporalCart) { //Si no tenia carro, lo creo
            const formData = {
                userId: user.id,
                prodId
            }
            let createdCart = (await (await fetch(`${window.location.origin}/api/user/createTempCart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })).json());

            // Actualizamos manualmente a user
            user.temporalCart = {
                id: createdCart.tempCart.id,
                temporalItems: []
            };
            user.temporalCart.temporalItems.push({
                temporal_cart_id: createdCart.tempCart.id,
                products_id: prodId,
                quantity: 1
            })
        } else { // Si tenia, tengo que agregarlo al carro que ya esta creado
            let cart = user.temporalCart.temporalItems;
            let prodIndex = cart.findIndex(item => item.products_id == prodId); //busco si esta el prod que selecciónaron en el carro
            // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
            if (prodIndex < 0) { //Si NO esta lo agrego, si esta no pasa nada
                let response = (await (await fetch(`${window.location.origin}/api/user/addTempItem`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tempCartId: user.temporalCart.id,
                        prodId,
                        userId: user.id
                    })
                })).json());
                // Agrego el producto a temporalItems parcial
                user.temporalCart.temporalItems.push({
                    temporal_cart_id: user.temporalCart.id,
                    products_id: prodId,
                    quantity: 1
                })
            }
        }
    } catch (error) {
        console.log("Falle en add: " + error);
    };
};
// Borra el item en cuestion de la DB
export async function removeTempItemFromDB(prodId, user) {
    (await (await fetch(`${window.location.origin}/api/user/deleteTempItem`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prodId,
            user
        })
    })).json());
    // Lo borro del userLogged
    user.temporalCart.temporalItems = user.temporalCart.temporalItems.filter(item => item.products_id != prodId);

}
// Agrega el item en cuestion a localStorage
export function addProductToLocaleCart(prodId) {
    // Obtengo el carrito de sessionStorage
    const cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

    // Verifico si el producto ya está en el carrito
    const productAlreadyInCart = cart.find(item => item.products_id == prodId);
    if (productAlreadyInCart) {
        // Si el producto ya está en el carrito, no hago nada
        return;
    }

    // Agrego el producto al carrito
    cart.push({
        products_id: prodId,
        quantity: 1
    });

    localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Borra el item en cuestion de localStorage
export function removeProductfromLocaleCart(prodId) {
    // Obtengo el carrito de sessionStorage
    let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

    cart = cart.filter(prod => prod.products_id != prodId);

    localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Logica para pintar el boton que corresponda del carro en product Detail
export function checkIfProductIsInCartDetail() {
    const productCard = document.querySelector('.product-container');
    if (!productCard) return
    const productId = productCard.dataset.productid;
    // Hace un find ==> encuentra si el producto esta en el carro
    let productAlreadyInCart;
    if (userLogged) {
        productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(item => item.products_id == productId);
    } else {
        let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
        productAlreadyInCart = cart.find(item => item.products_id == productId);
    }
    if (productAlreadyInCart) {
        productCard.querySelector('.quick-add-cart-btn').classList.add('hidden');
        productCard.querySelector('.remove-cart-product').classList.remove('hidden');
    }
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Recibe fecha de DB y devuelve 15 de agosto de 2021
export function getPrettyDate(dbDate) {
<<<<<<< HEAD
  const date = new Date(dbDate);

  const day = date.getDate();
  const month = date.toLocaleString("es", { month: "long" });
  const year = date.getFullYear();

  return `${day} de ${month} del ${year}`;
}
// Recibe fecha de DB y devuelve ago 15, 2023
export function getPrettyDateReversed(dbDate) {
  const date = new Date(dbDate);

  const day = date.getDate();
  let month = date.toLocaleString("es", { month: "short" });
  month = month.charAt(0).toUpperCase() + month.slice(1); //Primer letra en mayuscula
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
=======
    const date = new Date(dbDate);

    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'long' });
    const year = date.getFullYear();

    return `${day} de ${month} del ${year}`
};
// Recibe fecha de DB y devuelve ago 15, 2023
export function getPrettyDateReversed(dbDate) {
    const date = new Date(dbDate);

    const day = date.getDate();
    let month = date.toLocaleString('es', { month: 'short' });
    month = month.charAt(0).toUpperCase() + month.slice(1); //Primer letra en mayuscula
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}

// Escucha las imagenes de productEdit/Create y blogEdit/Create
export function listenForImagesToSelectMain() {
<<<<<<< HEAD
  const images = document.querySelectorAll(".image-to-select-main");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      const cont = img.closest(".image-radio-box");
      cont.querySelector("input").checked = true;
    });
  });
}
export function formatPriceNumber() {
  let priceNumbers = document.querySelectorAll(".price-number");

  priceNumbers.forEach((num) => {
    // Obtener el texto del elemento y asegurarse de que no haya separadores incorrectos
    let rawValue = num.innerHTML.trim();

    // Si el número ya está en formato correcto (ej: "245.000,00"), lo convertimos a formato numérico
    if (rawValue.includes(",")) {
      rawValue = rawValue.replace(/\./g, "").replace(",", ".");
    }

    // Convertir a número decimal correctamente
    let parsedValue = parseFloat(rawValue);

    // Verificar si es un número válido antes de modificar el innerHTML
    if (!isNaN(parsedValue)) {
      num.innerHTML = formatNumberEuropean(parsedValue);
    }
  });
}

// Función para formatear números con punto para miles y coma para decimales
export function formatNumberEuropean(number) {
  // Convertir número a string con 2 decimales
  let formattedNumber = number.toFixed(2);

  // Separar parte entera y decimal
  let [integerPart, decimalPart] = formattedNumber.split(".");

  // Aplicar separador de miles con punto
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Retornar el número formateado con coma para decimales
  return `${integerPart},${decimalPart}`;
}

// Función para quitar los separadores y convertir a número sin formato
export function removeNumberSeparators(numberString) {
    if(!numberString) return ""
  // Convertir de formato europeo (50.000,50) a formato numérico (50000.50)
  return parseFloat(numberString?.replace(/\./g, "")?.replace(",", "."));
}

// Logica para que todos los inputs numericos no acepten letras
export function checkForNumericInputs() {
  let numericInputs = document.querySelectorAll(".numeric-only-input");
  numericInputs.forEach((input) => {
    // Tomo el ultimo valor
    let lastInputValue = input.value;
    input.addEventListener("input", function (e) {
      var inputValue = e.target.value;
      if (!isNumber(inputValue)) {
        // Si no es un número, borra el contenido del campo
        e.target.value = lastInputValue;
      } else {
        lastInputValue = inputValue; // Almacenar el último valor válido
      }
    });
  });
}
// Logica para todos los inputs float
export function checkForFloatInputs() {
  let floatInputs = document.querySelectorAll(".float-only-input");
  floatInputs.forEach((input) => {
    // Tomo el ultimo valor
    let lastInputValue = input.value;
    input.addEventListener("input", function (e) {
      var inputValue = e.target.value;
      if (!isFloat(inputValue)) {
        // Si no es un número, borra el contenido del campo
        e.target.value = lastInputValue;
      } else {
        lastInputValue = inputValue; // Almacenar el último valor válido
      }
    });
  });
}

// Condiciones de la contrasena
export function passwordValidation(password) {
  // Al menos 1 número
  const oneNumber = /[0-9]/.test(password);

  // Mínimo 6 caracteres
  const validLength = password.length >= 6;

  // Al menos 1 letra en mayúscula
  const oneUpperLetter = /[A-Z]/.test(password);

  return oneNumber && validLength && oneUpperLetter;
}

export function createErrorMsg(msg) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("error-msg");
  paragraph.textContent = msg;
  return paragraph;
=======
    const images = document.querySelectorAll('.image-to-select-main');

    images.forEach(img => {
        img.addEventListener('click', () => {
            const cont = img.closest('.image-radio-box');
            cont.querySelector('input').checked = true;
        })
    })
};
// Logica para mostrar todos los numeros con punto
export function formatPriceNumber() {
    let priceNumbers = document.querySelectorAll('.price-number');
    priceNumbers.forEach(num => num.innerHTML = parseInt(removeNumberSeparators(num.innerHTML)).toLocaleString('es'));
    return
};
export function removeNumberSeparators(number) { //ME los devuelve al formato 60000 para poder sumar
    return number.replace(/\./g, '');
};

// Logica para que todos los inputs numericos no acepten letras
export function checkForNumericInputs() {
    let numericInputs = document.querySelectorAll('.numeric-only-input');
    numericInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isNumber(inputValue)) { // Si no es un número, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
            }
        });
    });
}
// Logica para todos los inputs float 
export function checkForFloatInputs() {
    let floatInputs = document.querySelectorAll('.float-only-input');
    floatInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isFloat(inputValue)) { // Si no es un número, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
            }
        });
    });
}


// Condiciones de la contrasena
export function passwordValidation(password) {
    // Al menos 1 número
    const oneNumber = /[0-9]/.test(password);

    // Mínimo 6 caracteres
    const validLength = password.length >= 6;

    // Al menos 1 letra en mayúscula
    const oneUpperLetter = /[A-Z]/.test(password);

    return oneNumber && validLength && oneUpperLetter;
};

export function createErrorMsg (msg) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('error-msg');
    paragraph.textContent = msg;
    return paragraph
>>>>>>> 5dd5a98fbdd2e67b24936ae6fc91ea14d2788eb7
}
