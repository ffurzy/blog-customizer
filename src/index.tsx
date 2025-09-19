import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const updateCSSVariables = (state: ArticleStateType) => {
	document.documentElement.style.setProperty(
		'--font-family',
		state.fontFamilyOption.value
	);
	document.documentElement.style.setProperty(
		'--font-size',
		state.fontSizeOption.value
	);
	document.documentElement.style.setProperty(
		'--font-color',
		state.fontColor.value
	);
	document.documentElement.style.setProperty(
		'--container-width',
		state.contentWidth.value
	);
	document.documentElement.style.setProperty(
		'--bg-color',
		state.backgroundColor.value
	);
};

const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	useEffect(() => {
		updateCSSVariables(settings);
	}, [settings]);
	const handleApply = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	return (
		<main className={clsx(styles.main)}>
			<ArticleParamsForm currentSettings={settings} onApply={handleApply} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
