import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

const container = document.getElementById('app')
const root = createRoot(container);
root.render(
    <App />
);