import * as React from "react";
import { Route } from "react-router-dom";

// import {
// 	SongDatabasesPage,
// 	SongDatabasePage,
// 	MatiasClientPage,
// 	MatiasClientsPage,
// 	SongsPage,
// 	LoginPage
// } from "./pages";
import { graphql, ChildProps } from "react-apollo";
import { PAGE_VIEWER_QUERY } from "./servergql";
import { getPageViewerQuery } from "./types";
import { TagsPage } from "./pages/TagsPage";
import {
	LanguagesPage,
	LoginPage,
	AuthorsPage,
	SongsPage,
	EditSongPage,
	TagPage,
	AuthorPage,
	CopyrightPage,
	SongDatabasesPage,
	SongDatabasePage,
	LanguagePage,
	EwDatabasePage,
	EwDatabasesPage
} from "./pages";
import { CopyrightsPage } from "./pages/CopyrightsPage";

const withViewer = graphql(PAGE_VIEWER_QUERY);

export const Routes = withViewer(
	(props: ChildProps<{}, getPageViewerQuery>) => {
		if (props.data.loading) {
			return <div>Ladataan...</div>;
		}

		if (props.data.error) {
			return <div>Virhe??</div>;
		}

		if (!props.data.viewer.user) {
			return <LoginPage />;
		}

		return (
			<div>
				<Route path="/tags" component={TagsPage} />
				<Route path="/languages" component={LanguagesPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/authors" component={AuthorsPage} />
				<Route path="/copyrights" component={CopyrightsPage} />
				<Route path="/songs" component={SongsPage} />
				<Route
					path="/variation/:variationId"
					component={EditSongPage}
				/>
				<Route path="/tag/:tagId" component={TagPage} />
				<Route path="/language/:languageId" component={LanguagePage} />
				<Route path="/author/:authorId" component={AuthorPage} />
				<Route path="/copyright/:copyright" component={CopyrightPage} />
				<Route path="/songdatabases" component={SongDatabasesPage} />
				<Route
					path="/songdatabase/:songDatabaseId"
					component={SongDatabasePage}
				/>
				<Route path="/ewdatabases" component={EwDatabasesPage} />
				<Route
					path="/ewdatabase/:ewDatabaseId"
					component={EwDatabasePage}
				/>
				{/* <Route path="/songdatabases" component={SongDatabasesPage} />
				<Route
					path="/songdatabase/:songDatabaseId"
					component={SongDatabasePage}
				/>
				<Route
					path="/matiasclient/:matiasClientId"
					component={MatiasClientPage}
				/>
				<Route path="/matiasclients" component={MatiasClientsPage} />
				<Route path="/songs" component={SongsPage} />
				<Route path="/login" component={LoginPage} /> */}
			</div>
		);
	}
);
