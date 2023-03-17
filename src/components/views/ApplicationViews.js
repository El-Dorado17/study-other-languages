import { MentorViews } from "./MentorViews"
import { StudentViews } from "./StudentViews"


export const ApplicationViews = () => {
	
	const localLanguageUser = localStorage.getItem("language_user")
    const languageUserObject = JSON.parse(localLanguageUser)

    if (languageUserObject.staff){
        //Return Mentor Views
        return <MentorViews />
    }else{
        //Return Student Views
        return <StudentViews />
    }
	
}


/*
return <>
		<h1 className="title--main">Welcome to SOL!</h1>
		<div>Creative line about the app. 
			Add more stuff here after MVP. This section will also have
			student and mentor view if object is .staff</div>
	</>
*/