import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const articleParamsContainer = useRef<HTMLElement | null>(null);

	// открытие/закрытие формы
	const clickForm = useCallback((event: MouseEvent) => {
		console.log(event);
		const eventTarget: HTMLElement = event.target as HTMLElement;
		if (
			!articleParamsContainer.current?.contains(eventTarget) &&
			eventTarget.closest('div')?.role !== 'button'
		) {
			setOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', clickForm);
		} else {
			document.removeEventListener('mousedown', clickForm);
		}
	}, [isOpen]);

	// Выбор опций
	const [newOptions, setNewOptions] = useState(defaultArticleState);

	function handleSelectFontFamily(select: OptionType) {
		setNewOptions({ ...newOptions, fontFamilyOption: select });
	}

	function handleSelectFontColor(select: OptionType) {
		setNewOptions({ ...newOptions, fontColor: select });
	}

	function handleSelectBackgroundColor(select: OptionType) {
		setNewOptions({ ...newOptions, backgroundColor: select });
	}

	function handleSelectContentWidth(select: OptionType) {
		setNewOptions({ ...newOptions, contentWidth: select });
	}

	function handleSelectFontSize(select: OptionType) {
		setNewOptions({ ...newOptions, fontSizeOption: select });
	}

	// Функциональные кнопки

	function handleClickReset() {
		setNewOptions(defaultArticleState);
		onApply(defaultArticleState);
		setOpen(false);
	}

	function handleClickApply(e: React.MouseEvent) {
		e.preventDefault();
		onApply(newOptions);
		setOpen(false);
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setOpen(!isOpen);
				}}
			/>
			<aside
				className={
					isOpen
						? `${styles.container + ' ' + styles.container_open}`
						: `${styles.container}`
				}
				ref={articleParamsContainer}>
				<form className={styles.form}>
					<div className={styles.form_points}>
						<Select
							selected={newOptions.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифты'
							onChange={handleSelectFontFamily}
						/>
						<RadioGroup
							options={fontSizeOptions}
							name={'fontSize'}
							selected={newOptions.fontSizeOption}
							title={'размер шрифта'}
							onChange={handleSelectFontSize}
						/>
						<Select
							selected={newOptions.fontColor}
							options={fontColors}
							title={'цвет шрифта'}
							onChange={handleSelectFontColor}
						/>
						<Separator />
						<Select
							selected={newOptions.backgroundColor}
							options={backgroundColors}
							title={'цвет фона'}
							onChange={handleSelectBackgroundColor}
						/>
						<Select
							selected={newOptions.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={handleSelectContentWidth}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClickReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleClickApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
