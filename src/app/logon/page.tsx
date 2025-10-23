
'use client'
import styles from './Logon.module.scss';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Logon() {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Image src="/img/logo-logon-5c98b7.png" alt="Logo" width={187} height={62.5} className={styles.logoImage} />
				</div>
				<h1 className={styles.title}>Criar uma conta</h1>
				<h2 className={styles.subtitle}>Preencha seus dados para se registrar.</h2>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor="name" className={styles.label}>Nome</label>
						<div className={styles.inputIconWrapper}>
							<Image src="/img/user-icon.svg" alt="User" width={16} height={16} className={styles.icon} />
							<Input id="name" type="text" placeholder="Seu nome completo" className={styles.input} />
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="email" className={styles.label}>Email</label>
						<div className={styles.inputIconWrapper}>
							<Image src="/img/mail-icon.svg" alt="Mail" width={16} height={16} className={styles.icon} />
							<Input id="email" type="email" placeholder="seu.email@exemplo.com" className={styles.input} />
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password" className={styles.label}>Senha</label>
						<div className={styles.inputIconWrapper}>
							<Image src="/img/lock-icon.svg" alt="Lock" width={16} height={16} className={styles.icon} />
							<Input id="password" type="password" placeholder="********" className={styles.input} />
						</div>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
						<div className={styles.inputIconWrapper}>
							<Image src="/img/lock-icon.svg" alt="Lock" width={16} height={16} className={styles.icon} />
							<Input id="confirmPassword" type="password" placeholder="********" className={styles.input} />
						</div>
					</div>
					<Button type="submit" className={styles.button}>Concluir Cadastro</Button>
				</form>
			</div>
		</main>
	);
}
