import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../models/MessageModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../Utils/Pagination";
import { MessageToResponse } from "./MessageToResponse";
import AdminMessageRequest from "../../models/AdminMessageRequest";

export const AdminMessages = () => {

    const { authState } = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [messages, setMessages] = useState<MessageModel[]>([]);
    
    const [messagesPerPage, setMessagesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json",
                    }
                };
                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error("Something went wrong!");
                }
                const messagesResponseJson = await messagesResponse.json();
                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage, btnSubmit]);

    if (isLoadingMessages) {
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

    async function submitResponseToQuestion(messageId: number, response: string) {
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if (authState && authState.isAuthenticated && messageId != null && response != '') {
            const messageAdminRequestModel:AdminMessageRequest = new AdminMessageRequest(messageId, response);
            const requestOptions = {
                method: "PUT", 
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(messageAdminRequestModel)
            }
            const messageAdminRequestResponse = await fetch(url, requestOptions);
            if (!messageAdminRequestResponse.ok) {
                throw new Error("Something went wrong!");
            }
            setBtnSubmit(!btnSubmit);
        }
    }

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="mt-3">
            {messages.length > 0 ? 
                <>
                    <h5>Pending Q/A: </h5>
                    {messages.map(message => (
                        <MessageToResponse key={message.id} message={message} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))}
                </>
                : 
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && 
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    )
}