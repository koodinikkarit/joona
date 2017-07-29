import React from 'react';

export default class PageFrame extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Joona</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
                </head>
                <body>
                    <div id="root">
                        {this.props.content}
                    </div>
                    <script src="/js/app.js"></script>
                </body>
            </html>
        )
    }
}