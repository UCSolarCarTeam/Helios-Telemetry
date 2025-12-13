import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

/**
 * Driver table (not a hypertable)
 * Stores driver information linked by RFID
 */
@Entity("driver")
export class Driver {
  @PrimaryColumn({ type: "text" })
  rfid!: string;

  @Column({ type: "text" })
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
