import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

// use this table!!

/**
 * Driver table (not a hypertable)
 * Stores driver information linked by RFID
 */
@Entity("driver")
export class Driver {
  @PrimaryColumn({ type: "text" })
  Rfid!: string;

  @Column({ type: "text" })
  Name!: string;

  // might not need these two but good practice 
  // @CreateDateColumn()
  // CreatedAt!: Date;

  // @UpdateDateColumn()
  // UpdatedAt!: Date;
}
