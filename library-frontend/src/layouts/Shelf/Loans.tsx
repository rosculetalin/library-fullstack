import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModel } from "./LoansModel";

export const Loans = () => {

    const {authState} = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(false);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentLoans`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        ContentType: "application/json"
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error("Something went wrong!");
                }
                const shelfCurrentLoansJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function doReturnCheckoutBook(bookId: number) {
        const url = `http://localhost:8080/api/books/secure/return?bookId=${bookId}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                ContentType: "application/json"
            }
        };
        const returnCheckoutBookResponse = await fetch(url, requestOptions);
        if (!returnCheckoutBookResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setCheckout(!checkout);
    }

    async function renewBookLoan(bookId: number) {
        const url = `http://localhost:8080/api/books/secure/renew/loan?bookId=${bookId}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                ContentType: "application/json"
            }
        };
        const renewBookLoanResponse = await fetch(url, requestOptions);
        if (!renewBookLoanResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setCheckout(!checkout);
    }

    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-lg-block mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>Current Loans: </h5>

                        {shelfCurrentLoans.map(currentLoan => (
                            <div key={currentLoan.book.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {
                                            currentLoan.book?.img ?
                                            <img src={currentLoan.book?.img} width="226" height="349" alt="book" />
                                            :
                                            <img src={require("./../../Images/BooksImages/book-1000.png")} width="226" height="349" alt="book" />
                                        }
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Loan Options</h4>
                                                {currentLoan.daysLeft > 0 && 
                                                    <p className="text-secondary">
                                                        Due in {currentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                {currentLoan.daysLeft == 0 &&
                                                    <p className="text-success">
                                                        Due Today.
                                                    </p>
                                                }
                                                {currentLoan.daysLeft < 0 &&
                                                    <p className="text-danger">
                                                        Past due by {currentLoan.daysLeft} days.
                                                    </p>
                                                }
                                                <div className="list-group mt-3">
                                                    <button className="list-group-item list-group-item-action" aria-current="true"
                                                        data-bs-toggle="modal" data-bs-target={`#modal${currentLoan.book.id}`}>
                                                            Manage Loan
                                                    </button>
                                                    <Link to={'search'} className="list-group-item list-group-item-action">
                                                        Search More Books
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr/>
                                            <p className="mt-3">
                                                Help other find their adventure by reviewing your loan.
                                            </p>
                                            <Link className="btn btn-primary" to={`/checkout/${currentLoan.book.id}`}>
                                                Leave a Review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <LoansModel currentLoans={currentLoan} mobile={false} returnBook={doReturnCheckoutBook} renewLoan={renewBookLoan}/>
                            </div>   
                        ))}
                    </>
                    :
                    <>
                        <h3 className="mt-3">Currently no loans</h3>
                        <Link className="btn btn-primary" to={"/search"}>
                            Search for books
                        </Link>
                    </>
                }
            </div>

            {/* Mobile */}
            <div className="container d-lg-none mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className="mb-3">Current Loans: </h5>

                        {shelfCurrentLoans.map(currentLoan => (
                            <div key={currentLoan.book.id}>
                                <div className="d-flex justify-content-center align-items-center">
                                    {
                                        currentLoan.book?.img ?
                                        <img src={currentLoan.book?.img} width="226" height="349" alt="book" />
                                        :
                                        <img src={require("./../../Images/BooksImages/book-1000.png")} width="226" height="349" alt="book" />
                                    }
                                </div>
                                <div className="card d-flex mt-5 mb-3">
                                    <div className="card-body container">
                                        <div className="mt-3">
                                            <h4>Loan Options</h4>
                                            {currentLoan.daysLeft > 0 && 
                                                <p className="text-secondary">
                                                    Due in {currentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {currentLoan.daysLeft == 0 &&
                                                <p className="text-success">
                                                    Due Today.
                                                </p>
                                            }
                                            {currentLoan.daysLeft < 0 &&
                                                <p className="text-danger">
                                                    Past due by {currentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className="list-group mt-3">
                                                <button className="list-group-item list-group-item-action" aria-current="true"
                                                    data-bs-toggle="modal" data-bs-target={`#mobilemodal${currentLoan.book.id}`}>
                                                        Manage Loan
                                                </button>
                                                <Link to={'search'} className="list-group-item list-group-item-action">
                                                    Search More Books
                                                </Link>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className="mt-3">
                                            Help other find their adventure by reviewing your loan.
                                        </p>
                                        <Link className="btn btn-primary" to={`/checkout/${currentLoan.book.id}`}>
                                            Leave a Review
                                        </Link>
                                    </div>
                                </div>
                                <hr/>
                                <LoansModel currentLoans={currentLoan} mobile={true} returnBook={doReturnCheckoutBook} renewLoan={renewBookLoan}/>
                            </div>   
                        ))}
                    </>
                    :
                    <>
                        <h3 className="mt-3">
                            Currently no loans
                        </h3>
                        <Link className="btn btn-primary" to={"/search"}>
                            Search for books
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}