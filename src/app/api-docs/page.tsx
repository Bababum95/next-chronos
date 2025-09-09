"use client";

import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#fff", paddingTop: 1 }}>
            <SwaggerUI url="/api/v1/swagger" />
        </div>
    );
}

