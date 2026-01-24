import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Driver table
 * Stores driver information linked by RFID
 */
@Entity("driver")
export class Driver {
  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "text" })
  Name!: string;

  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}
